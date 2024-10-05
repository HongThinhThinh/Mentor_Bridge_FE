import { useState } from "react";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import { PieChart } from "../../molecules/chart/pie-chart/PieChart";

const HomeTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [remainDate, setRemainDate] = useState(3);
  const [goodRate, setGoodRate] = useState(80);
  return (
    <div className="py-6 h-full w-full flex gap-6">
      <div className="w-1/4 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-abstract.svg')"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-white gap-2 flex flex-col">
                <span className="text-sm-medium">
                  Buổi hẹn tiếp theo sẽ bắt đầu vào
                </span>
                <h3 className="text-xl-extra-bold">{remainDate} ngày nữa</h3>
              </div>
              <div className="flex justify-end">
                <Button
                  size="xs"
                  styleClass="bg-shade-900 text-white"
                  fontSize="xs"
                >
                  Xem lịch ngay
                </Button>
              </div>
            </div>
          </CustomizedCard>
        </div>
        <div className="h-2/3">
          <CustomizedCard loading={loading} styleClass="">
            <div className="h-full w-full">
              <PieChart
                data={[
                  {
                    id: "bad",
                    label: "Phần còn lại",
                    value: 100 - goodRate,
                  },
                  {
                    id: "good",
                    label: "Đánh giá tốt",
                    value: goodRate,
                  },
                ]}
              ></PieChart>
            </div>
          </CustomizedCard>
        </div>
      </div>
      <div className="w-3/4 h-full gap-6 flex flex-col">
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
