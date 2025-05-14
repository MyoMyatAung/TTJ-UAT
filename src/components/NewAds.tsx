import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAdsQuery } from "../services/helperService";
import useCachedImage from "./../utils/useCachedImage";

interface AdItem {
  data?: {
    url?: string;
    image?: string;
  };
  remarks?: string;
  sort?: number;
}

interface NewAdsProps {
  section: string;
  fromMovie?: boolean;
}

const NewAds: React.FC<NewAdsProps> = ({ section, fromMovie = false }) => {
  const [cur, setCur] = useState<AdItem[]>([]);
  const { data, isLoading } = useGetAdsQuery();

  useEffect(() => {
    if (data?.data?.[section]) {
      const ads = data?.data?.[section];
      const sortedData = [...ads].sort((a, b) => b.sort - a.sort);
      setCur(sortedData as AdItem[]);
    }
  }, [data, section]);

  const AdItemComponent = ({ item }: { item: AdItem }) => {
    const imageUrl = item.data?.image || "";
    const { imgSrc, isLoading: imageLoading } = useCachedImage(imageUrl);

    return (
      <>
        {/* <Link
          target="_blank"
          className="flex flex-col justify-center items-center gap-[4px]"
          to={item.data?.url || "#"}
        >
          {imageLoading && (
            <div className="w-[56px] h-[56px] object-cover rounded-[8px] mx-auto bg-white/15 animate-pulse flex justify-center items-center">
              <p className="text-[12px] font-[500] text-[#888]">
                {item?.remarks}
              </p>
            </div>
          )}
          {imgSrc && (
            <img
              src={imgSrc}
              className="w-[56px] h-[56px] object-cover rounded-[8px] mx-auto"
              alt="ad"
              loading="lazy"
            />
          )}
          <p className="text-[12px] font-[500] text-[#888]">
            {item?.remarks || "No description"}
          </p>
        </Link> */}

        <Link
          to={item.data?.url || "#"}
          target="_blank"
          className="flex flex-col justify-center items-center gap-[6px]"
        >
          {imageLoading && (
            <div className="min-w-[56px] min-h-[56px] object-cover rounded-[8px] mx-auto bg-white/15 animate-pulse flex justify-center items-center">
              <p className="text-[12px] font-[500] text-[#888]">
                {item?.remarks}
              </p>
            </div>
          )}
          {imgSrc && (
            <img
              src={imgSrc}
              className="min-w-[56px] min-h-[56px] rounded-[8px] border-[#222]"
              alt="ad"
              loading="lazy"
            />
          )}
          <h1 className="text-[#fff] text-[12px] font-[500]">
            {item?.remarks || "No description"}
          </h1>
        </Link>
      </>
    );
  };

  return (
    <div
      className={`${
        fromMovie ? "" : "max-md:px-3 px-10"
      } flex flex-col justify-center py-1`}
    >
      <div className="grid w-full grid-cols-5 md:grid-cols-10 justify-center items-center gap-2">
        {isLoading && !cur?.length
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-[4px] animate-pulse mb-1"
              >
                <div className="w-[56px] h-[56px] bg-white/30 rounded-[4px]" />
              </div>
            ))
          : cur.map((item, index) => (
              <AdItemComponent key={index} item={item} />
            ))}
      </div>
    </div>
  );
};

export default NewAds;
