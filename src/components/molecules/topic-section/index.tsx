import React, { memo } from "react";
import "./index.scss";
import { Topic } from "../../../model/topic";
import { downloadBase64File } from "../../../utils/dowloadBase64File";
import { Button } from "antd";

interface TopicItemProps {
  index: number;
  title: string;
  author: string;
  assets: any; // Có thể cải thiện kiểu dữ liệu cho assets
}

// Sửa lỗi ở đây, truyền props cho hàm của React.memo
const TopicItem: React.FC<TopicItemProps> = memo(
  ({ index, title, author, assets }) => {
    const handleDownload = (asset: any) => {
      downloadBase64File(asset.content, asset.name);
    };

    return (
      <li className="topic-item">
        <span className="index">{index}</span>
        <div className="content">
          <span className="title">{title}</span>
        </div>
        <span className="actions">
          {assets?.map((asset: any, assetIndex: number) => (
            <Button
              onClick={() => handleDownload(asset)}
              key={assetIndex}
              className="asset"
            >
              {asset.name}
            </Button>
          ))}
        </span>
      </li>
    );
  }
);

interface TopicListProps {
  topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  return (
    <ul className="topic-list">
      {topics?.map((topic, index) => (
        <TopicItem
          key={index}
          index={index + 1}
          title={topic?.name}
          author={topic?.creator?.fullName}
          assets={topic?.files}
        />
      ))}
    </ul>
  );
};

export default TopicList;
