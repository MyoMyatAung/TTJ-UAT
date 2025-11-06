import React, { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js"; // Import Hls.js
import floatingScreen from "../../../assets/floatingScreen.png";
import axios from "axios";
import { VideoPlayerProps } from "../../../model/videoModel";
import { useGetRecordQuery } from "../../profile/services/profileApi";
import { convertToSecurePayload } from "../../../services/newEncryption";
import { useDispatch, useSelector } from "react-redux";
import { setShowSetSkipDialog } from "../../../features/player/playerSlice";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onBack,
  movieDetail,
  selectedEpisode,
  resumeTime,
  handleVideoError,
  autoPlayNextEpisode,
  hasNextEpisode = false,
}) => {
  const playerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const videoElementRef = useRef<HTMLDivElement>(null);
  const [videoRatio, setVideoRatio] = useState(9 / 16); // Default to 16:9 ratio
  const { refetch } = useGetRecordQuery(); // Fetch favorite movies list from API
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [reHeight, setReHeight] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  // const [showSkipIntro, setShowSkipIntro] = useState(false);
  // const [showNextEpisode, setShowNextEpisode] = useState(false);

  // Get skipIntro and skipOutro values from Redux store
  const skipIntro = useSelector((state: any) => state.episode.skipIntro);
  const skipOutro = useSelector((state: any) => state.episode.skipOutro);

  // Function to check if browser natively supports HLS
  const hasNativeHLSSupport = () => {
    return false;
    // const video = document.createElement("video");
    // return (
    //   video.canPlayType("application/vnd.apple.mpegurl") !== "" ||
    //   video.canPlayType("application/x-mpegURL") !== ""
    // );
  };

  // Function to get token from localStorage
  const getToken = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
    return parsedLoggedIn?.data?.access_token;
  };

  // Function to report playback progress on specific events (back or episode change)
  const reportProgress = async (currentTime: number, duration: number) => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/movie_play/report`,
        convertToSecurePayload({
          movie_id: movieDetail.id, // Assuming movie_id is movie name
          episode_id: selectedEpisode?.episode_id,
          movie_from: selectedEpisode?.from_code,
          duration: Math.floor(duration), // Report in seconds
          current_time: Math.floor(currentTime), // Report in seconds
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error reporting playback progress:", error);
    }
  };

  useEffect(() => {
    let hls: Hls | null = null;

    const initializePlayer = async () => {
      if (videoElementRef.current && videoUrl) {
        const art = new Artplayer({
          container: videoElementRef.current,
          url: videoUrl,
          autoplay: true,
          playbackRate: true,
          setting: true,
          theme: "#FE58B5",
          // fullscreen: true,
          airplay: true,
          controls: [
            {
              position: "right",
              html: `<div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 3H22V9H20V5H16V3H20ZM4 3H8V5H4V9H2V3H4ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z" fill="white" fill-opacity="0.9"/>
</svg><div>`,
              tooltip: "Fullscreen",
              click: function (...args) {
                // playerRef.current.fullscreen = true;
                if (
                  (window as any).webkit &&
                  (window as any).webkit.messageHandlers &&
                  (window as any).webkit.messageHandlers.jsBridge
                ) {
                  (window as any).webkit.messageHandlers.jsBridge.postMessage({
                    eventName: "fullscreen",
                  });
                } else {
                  playerRef.current.fullscreen = true;
                }
              },
            },
            {
              // disable: ,
              position: 'top',
              html: '<button id="show-set-skip-dialog-btn">跳过片头片尾</button>',
              index: 1,
              tooltip: '',
              style: {
                // marginRight: '20px',
                // display: 'none',
              },
              click() {
                sendNativeEvent('open_set_skip_dialog');
              },
            },
          ],
          layers: [
            {
              html: `<div id="skip-intro-control" style="display: none; justify-content: flex-end; z-index: 1000;">
                <button style="background: #161619CC; color: #FF6A33; font-size: 12px; padding: 8px 16px; border: none; border-radius: 20px; cursor: pointer;">
                  跳过片头
                </button>
              </div>`,
              click() {
                // window.open('https://aimu.app')
                // console.info('You clicked on the custom layer')
              },
              style: {
                position: 'absolute',
                bottom: '80px',
                right: '20px',
                opacity: '.9',
              },
            },
            {
              html: `<div id="next-episode-control" style="display: none; justify-content: flex-end; z-index: 1000;">
                <button style="background: #161619CC; color: #FF6A33; font-size: 12px; padding: 8px 16px; border: none; border-radius: 20px; cursor: pointer;">
                  下一集
                </button>
              </div>`,
              click() {
                // This will be handled by our custom event listener
              },
              style: {
                position: 'absolute',
                bottom: '80px',
                right: '20px',
                opacity: '.9',
              },
            }
          ]
          // miniProgressBar: true,
          // moreVideoAttr: {
          //   playsInline: true,
          // },

        });

        // Handle HLS streams: prioritize native support, fallback to HLS.js
        if (videoUrl.includes(".m3u8")) {
          if (hasNativeHLSSupport()) {
            // Use native HLS support (Safari, iOS, etc.)
            art.video.src = videoUrl;
            console.log("Using native HLS support");

            // Add error handling for native HLS
            art.video.addEventListener("error", (e) => {
              console.error("Native HLS error:", e);
              handleVideoError(videoUrl);
            });

            // // Add timeout for loading
            // const loadTimeout = setTimeout(() => {
            //   if (art.video.readyState === 0) {
            //     console.error("Video loading timeout");
            //     handleVideoError(videoUrl);
            //   }
            // }, 10000); // 10 second timeout

            // // Clear timeout when video starts loading
            // art.video.addEventListener('loadstart', () => {
            //   clearTimeout(loadTimeout);
            // });
          } else if (Hls.isSupported()) {
            // Fallback to HLS.js for browsers without native support
            hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(art.video);

            // Handle HLS errors
            hls.on(Hls.Events.ERROR, (_, data) => {
              console.error("HLS.js error:", data);
              if (data.fatal) {
                handleVideoError(videoUrl);
              } else if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                console.error("Network error, attempting recovery");
                if (hls) {
                  hls.startLoad();
                }
              }
            });

            // // Add timeout for HLS loading
            // const hlsTimeout = setTimeout(() => {
            //   if (art.video.readyState === 0) {
            //     console.error("HLS loading timeout");
            //     handleVideoError(videoUrl);
            //   }
            // }, 10000); // 10 second timeout

            // // Clear timeout when manifest is loaded
            // hls.on(Hls.Events.MANIFEST_LOADED, () => {
            //   clearTimeout(hlsTimeout);
            // });

            console.log("Using HLS.js library");
          } else {
            // Neither native nor HLS.js support available
            art.video.src = videoUrl;
            console.log("No HLS support detected, trying direct URL");

            // Add error handling for fallback
            art.video.addEventListener("error", (e) => {
              console.error("Video error (no HLS support):", e);
              handleVideoError(videoUrl);
            });
          }
        } else {
          // Non-HLS video
          art.video.src = videoUrl;

          // Add error handling for regular videos
          art.video.addEventListener("error", (e) => {
            console.error("Video error:", e);
            handleVideoError(videoUrl);
          });
        }

        // Adjust video ratio based on the video's actual dimensions
        art.once("video:loadedmetadata", () => {
          const videoWidth = art.video.videoWidth;
          const videoHeight = art.video.videoHeight;
          if (videoWidth > videoHeight) {
            sendNativeEvent("landscape_view");
            setIsLandscape(true);
          } else if (videoHeight > videoWidth) {
            sendNativeEvent("potrait_view");
            setIsLandscape(false);
          } else {
            sendNativeEvent("square_view");
            setIsLandscape(false);
          }
          setVideoRatio(videoHeight / videoWidth); // Set the dynamic aspect ratio
          setReHeight(videoWidth < videoHeight);
        });
        art.on("error", (error, reconnectTime) => {
          console.error("ArtPlayer error:", error);
          handleVideoError(videoUrl);
        });
        const controls: any = document.querySelector(".art-controls-right");
        if (controls) {
          controls.style.display = "flex"; // Ensure display is flex
          controls.style.flexDirection = "row-reverse"; // Dynamically set direction
        }
        // Set resume time if available
        art.once("ready", () => {
          if (resumeTime > 0) {
            art.currentTime = resumeTime;
          }
          setTimeout(() => {
            if (playerRef.current) {
              const token = getToken();
              if (token) {
                reportProgress(
                  playerRef.current.currentTime,
                  playerRef.current.duration
                );
              }
            }
          }, 1000);
          setTimeout(() => {
            if (playerRef.current) {
              const token = getToken();
              if (token) {
                refetch();
              }
            }
          }, 3000);
        });
        art.on("control", (state) => {
          setIsControlsVisible(state);
        });
        art.on("video:ended", () => {
          autoPlayNextEpisode();
        });
        playerRef.current = art;
      }
    };

    initializePlayer();

    // Orientation change listener
    const handleOrientationChange = () => {
      if (playerRef && playerRef.current) {
        playerRef.current.fullscreen =
          window.innerWidth > window.innerHeight ? true : false;
      }
    };

    // Add the event listener for orientation change
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      // Clean up HLS and ArtPlayer
      if (hls) {
        hls.destroy(); // Stop HLS requests
        hls = null;
      }
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.video.src = ""; // Clear video source
        playerRef.current.destroy(); // Destroy ArtPlayer
        playerRef.current = null;
      }
    };
  }, [videoUrl, resumeTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && playerRef.current) {
        playerRef.current.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle Skip Intro button click
  const handleSkipIntro = React.useCallback(() => {
    if (playerRef.current && skipIntro && skipIntro > 0) {
      playerRef.current.currentTime = skipIntro;
      sendNativeEvent('skip_intro');
      // setShowSkipIntro(false);
      const skipIntroControl = document.getElementById('skip-intro-control');
      if (skipIntroControl) {
        skipIntroControl.style.display = 'none';
      }
    }
  }, [skipIntro]);

  // Handle Next Episode button click
  const handleNextEpisode = React.useCallback(() => {
    autoPlayNextEpisode();
    sendNativeEvent('skip_outro');
    // setShowNextEpisode(false);
    const nextEpisodeControl = document.getElementById('next-episode-control');
    if (nextEpisodeControl) {
      nextEpisodeControl.style.display = 'none';
    }
  }, [autoPlayNextEpisode]);

  // Monitor video time to show/hide Skip Intro and Next Episode buttons
  useEffect(() => {
    let timeUpdateInterval: NodeJS.Timeout;

    if (playerRef.current && (skipIntro > 0 || skipOutro > 0)) {
      timeUpdateInterval = setInterval(() => {
        const currentTime = playerRef.current?.currentTime || 0;
        const duration = playerRef.current?.duration || 0;
        const skipIntroControl = document.getElementById('skip-intro-control');
        const nextEpisodeControl = document.getElementById('next-episode-control');

        // Show Skip Intro button if we're within the intro period
        if (skipIntro > 0 && currentTime >= 0 && currentTime < skipIntro) {
          // setShowSkipIntro(true);
          if (skipIntroControl) {
            skipIntroControl.style.display = 'flex';
          }
        } else {
          // setShowSkipIntro(false);
          if (skipIntroControl) {
            skipIntroControl.style.display = 'none';
          }
        }

        // Show Next Episode button if we're within the outro period (near the end)
        if (skipOutro > 0 && duration > 0 && currentTime >= (duration - skipOutro) && hasNextEpisode) {
          // setShowNextEpisode(true);
          if (nextEpisodeControl) {
            nextEpisodeControl.style.display = 'flex';
          }
        } else {
          // setShowNextEpisode(false);
          if (nextEpisodeControl) {
            nextEpisodeControl.style.display = 'none';
          }
        }
      }, 500); // Check every 500ms

      // Add click event listeners to the ArtPlayer buttons
      const addEventListeners = () => {
        const skipIntroControl = document.getElementById('skip-intro-control');
        const skipIntroButton = skipIntroControl?.querySelector('button');
        const nextEpisodeControl = document.getElementById('next-episode-control');
        const nextEpisodeButton = nextEpisodeControl?.querySelector('button');

        if (skipIntroButton && !skipIntroButton.hasAttribute('data-listener-added')) {
          skipIntroButton.addEventListener('click', handleSkipIntro);
          skipIntroButton.setAttribute('data-listener-added', 'true');
        }

        if (nextEpisodeButton && !nextEpisodeButton.hasAttribute('data-listener-added')) {
          nextEpisodeButton.addEventListener('click', handleNextEpisode);
          nextEpisodeButton.setAttribute('data-listener-added', 'true');
        }
      };

      // Try to add listeners immediately, and also with a delay to ensure DOM is ready
      addEventListeners();
      setTimeout(addEventListeners, 100);
    }

    return () => {
      if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
      }
    };
  }, [skipIntro, skipOutro, isControlsVisible, handleSkipIntro, handleNextEpisode, hasNextEpisode]);

  useEffect(() => {
    // If the video is fullscreen, display show-set-skip-dialog button
    const showSetSkipDialogBtn = document.getElementById('show-set-skip-dialog-btn');
    if (showSetSkipDialogBtn) {
      console.log('Fullscreen status changed:', playerRef.current.fullscreen);
      if (playerRef.current.fullscreen) {
        showSetSkipDialogBtn.style.display = 'block';
      } else {
        showSetSkipDialogBtn.style.display = 'none';
      }
    }
  }, [playerRef?.current?.fullscreen]);

  // Define the event handler
  const sendNativeEvent = (message: string) => {
    if (
      (window as any).webkit &&
      (window as any).webkit.messageHandlers &&
      (window as any).webkit.messageHandlers.jsBridge
    ) {
      (window as any).webkit.messageHandlers.jsBridge.postMessage(message);
    }
  };

  const handleBack = async () => {
    onBack();
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const token = getToken();
        if (token) {
          reportProgress(
            playerRef.current.currentTime,
            playerRef.current.duration
          );
          refetch();
        }
      }
    }, 15000); // 15 seconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handlePiP = () => {
    if (document.pictureInPictureEnabled && playerRef.current) {
      if (playerRef.current.video !== document.pictureInPictureElement) {
        playerRef.current.video.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
      }
    }
  };
  // console.log("Render Skip Intro Button:", showSkipIntro, isControlsVisible);

  return (
    <div
      id="my-player"
      className={`relative w-full bg-black ${reHeight ? "h-[220px]" : "h-[220px]"
        }`}
    >
      {/* Back button */}
      {isControlsVisible && (
        <>
          <div className="absolute top-0 left-0 p-4 z-50">
            <button onClick={handleBack} className="text-white flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.22198L13.192 5.63598L7.828 11Z"
                  fill="white"
                />
              </svg>
              <p className="cus-elips">{selectedEpisode?.episode_name}</p>
            </button>
          </div>
          <div className="absolute top-0 right-0 p-4 z-50">
            <button className="text-white" onClick={handlePiP}>
              <img src={floatingScreen} alt="PiP" className="h-5 w-5" />
            </button>
          </div>
        </>
      )}

      {/* Skip Intro Button */}
      {/* {(showSkipIntro && !isControlsVisible) && (
        <div className="absolute bottom-12 right-4 z-50">
          <button
            onClick={handleSkipIntro}
            className="bg-[#161619CC] text-xs text-[#FF6A33] px-4 py-2 rounded-full"
          >
            Skip Intro
          </button>
        </div>
      )} */}

      {/* Video element wrapper */}
      <div
        className={`relative w-full ${reHeight ? "h-[220px]" : "h-[220px]"}`}
        style={
          isLandscape
            ? { height: "220px" }
            : { paddingTop: `${videoRatio * 100}%` }
        }
      >
        {/* Video element */}
        <div
          ref={videoElementRef}
          className={`absolute w-full ${reHeight
            ? "h-[220px]"
            : isLandscape
              ? "h-[220px] flex items-center justify-center"
              : "h-[220px]"
            }`}
          style={
            isLandscape
              ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
              : { top: 0, left: 0 }
          }
        ></div>
      </div>
    </div>
  );
};

export default VideoPlayer;
