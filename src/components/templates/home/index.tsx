import { useState } from "react";
import CustomizedCard from "../../molecules/card/Card";

const HomeTemplate = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="py-6 h-full w-full flex gap-6">
      <div className="w-1/3 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard loading={loading}></CustomizedCard>
        </div>
        <div className="h-2/3">
          <CustomizedCard loading={loading}></CustomizedCard>
        </div>
      </div>
      <div className="w-2/3 h-full gap-6 flex flex-col">
        <div className="h-1/2">
          <CustomizedCard loading={loading}></CustomizedCard>
        </div>
        <div className="h-1/2">
          <CustomizedCard loading={loading}></CustomizedCard>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
