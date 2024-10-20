import { useState } from "react";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import { PieChart } from "../../molecules/chart/pie-chart/PieChart";
import { EyeOutlined } from "@ant-design/icons";
import ContentsSection from "../../atoms/contents-section/ContentsSection";

const StudentPages = () => {
  const [loading, setLoading] = useState(true);
  const [remainDate, setRemainDate] = useState(3);
  const [goodRate, setGoodRate] = useState(80);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  return (
    <div className="pt-6 pb-10 h-full w-full flex gap-6">
      <div className="w-1/4 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-abstract.svg')"
            styleClass="border-none"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-white gap-2 flex flex-col">
                <span className="text-xs-medium">
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
          <CustomizedCard
            loading={loading}
            styleClass="bg-gradient-to-b from-[#151316] to-[#4D4252] border-none"
          >
            <div className="h-full w-full">
              <div className="text-white flex justify-between items-center">
                <span className="text-xs-medium">Số điểm còn lại</span>
                <Button styleClass="bg-[#FFFFFF30] rounded-[12px] h-[43px] w-[43px] flex justify-center items-center">
                  <EyeOutlined />
                </Button>
              </div>
              <PieChart
                data={[
                  {
                    id: "bad",
                    label: "Phần còn lại",
                    value: 100 - goodRate,
                  },
                  {
                    id: "good",
                    label: "Phản hồi tốt",
                    value: goodRate,
                  },
                ]}
              ></PieChart>
            </div>
          </CustomizedCard>
        </div>
      </div>
      <div className="w-3/4 h-full gap-6 flex flex-col">
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            styleClass="border border-shade-800 border-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Danh sách thành viên nhóm</h3>
              <Button size="xs" fontSize="xs">
                Thêm thành viên +
              </Button>
            </div>
            <ul className="space-y-3 overflow-y-scroll h-4/5">
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                <span className="flex justify-center items-center w-8 h-8 bg-white rounded-full border border-gray-300">
                  1
                </span>
                <div className="pl-4 flex-1">
                  <span className="block text-sm-medium">
                    ConnectED – Nền tảng kết nối sinh viên và giảng viên
                  </span>
                  <span className="text-xs-medium text-gray-500">PhuongNT</span>
                </div>
                <span className="text-sm-medium text-gray-500 cursor-pointer">
                  ...
                </span>
              </li>
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                <span className="flex justify-center items-center w-8 h-8 bg-white rounded-full border border-gray-300">
                  2
                </span>
                <div className="pl-4 flex-1">
                  <span className="block text-sm-medium">
                    SkillHub – Web học kỹ năng chuyên môn và thực hành
                  </span>
                  <span className="text-xs-medium text-gray-500">PhuongNT</span>
                </div>
                <span className="text-sm-medium text-gray-500 cursor-pointer">
                  ...
                </span>
              </li>
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                <span className="flex justify-center items-center w-8 h-8 bg-white rounded-full border border-gray-300">
                  3
                </span>
                <div className="pl-4 flex-1">
                  <span className="block text-sm-medium">
                    EcoMarket – Chợ trực tuyến giao dịch các sản phẩm hữu cơ
                  </span>
                  <span className="text-xs-medium text-gray-500">PhuongNT</span>
                </div>
                <span className="text-sm-medium text-gray-500 cursor-pointer">
                  ...
                </span>
              </li>
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                <span className="flex justify-center items-center w-8 h-8 bg-white rounded-full border border-gray-300">
                  4
                </span>
                <div className="pl-4 flex-1">
                  <span className="block text-sm-medium">
                    EventLink – Trang web tạo và quản lý sự kiện
                  </span>
                  <span className="text-xs-medium text-gray-500">PhuongNT</span>
                </div>
                <span className="text-sm-medium text-gray-500 cursor-pointer">
                  ...
                </span>
              </li>
            </ul>
          </CustomizedCard>
        </div>
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-green-abstract.svg')"
            styleClass="border-none"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Lịch sử yêu cầu cuộc họp</h3>
              <Button
                size="xs"
                styleClass="text-white"
                variant="frosted-glass"
                fontSize="xs"
              >
                Tất cả
              </Button>
            </div>
            <ul className="space-y-4 overflow-y-scroll h-4/5">
              <ContentsSection
                time="30-10-2024"
                value="Đánh giá nhóm"
                status="feedback"
              />
              <ContentsSection
                status="pending"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat facere quas quasi beatae corrupti minima vero cum at dolorem, veniam consequuntur non? Voluptate laborum aspernatur, delectus quis dolor sequi."
                time="30-10-2024"
                value="Đang xử lý"
              />
              <ContentsSection
                status="deny"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat facere quas quasi beatae corrupti minima vero cum at dolorem, veniam consequuntur non? Voluptate laborum aspernatur, delectus quis dolor sequi."
                time="30-10-2024"
                value="Bị từ chối"
              />
              <ContentsSection
                status="success"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat facere quas quasi beatae corrupti minima vero cum at dolorem, veniam consequuntur non? Voluptate laborum aspernatur, delectus quis dolor sequi."
                time="30-10-2024"
                value="Được chấp nhận"
              />
              <ContentsSection
                isReady
                status="pending"
                time="30-10-2024"
                value="Đang đợi chấp nhận"
              />
            </ul>
          </CustomizedCard>
        </div>
      </div>
    </div>
  );
};

export default StudentPages;
