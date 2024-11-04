import { Image } from "antd";
import img from "../../../assets/avatar.svg";
import { Button } from "../../atoms/button/Button";

function ConfirmReschedule() {
  return (
    <div className="flex justify-between items-center h-[100vh] p-5">
      <div className="flex items-center w-full pl-5">
        <div className="max-w-2xl mb-8">
          <h1 className="text-2xl-medium font-bold leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-3xl xl:leading-tight dark:text-white">
            Xin chào,
          </h1>
          <p className="py-5 text-xl-medium font-normal leading-normal text-black lg:text-2xl-black xl:text-2xl-black dark:text-gray-300 ">
            Giảng viên <strong>Jone Doe</strong> đã dời lịch cuộc họp từ ngày{" "}
            <strong>[ngày cũ]</strong> lúc <strong>[giờ cũ]</strong> sang ngày{" "}
            <strong>[ngày mới]</strong> lúc <strong>[giờ mới]</strong>.
            <br /> Bạn có chấp nhận sự thay đổi này không?
          </p>

          <div className="flex flex-col items-end">
            <div className="flex gap-5">
              <Button
                status="feedback"
                children="Từ chối"
                styleClass="w-[180px] bg-transparent border border-[#D5D5D7] text-black"
                fontSize="xl"
              />

              <Button
                type="submit"
                children="Chấp nhận"
                styleClass="w-[200px] text-shade-300 bg-transparent border border-[#D5D5D7] 
         bg-gradient-to-r from-[#FF6001] from-43.73%  to-[#F9A26E] to-99.08%"
                fontSize="xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="">
          <img
            className="h-80 w-64"
            src={img}
            alt="Avatar image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmReschedule;
