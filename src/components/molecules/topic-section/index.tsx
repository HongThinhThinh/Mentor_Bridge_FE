import React from "react";
import "./index.scss";
import { Topic } from "../../../model/topic";
interface TopicItemProps {
  index: number;
  title: string;
  author: string;
}

const TopicItem: React.FC<TopicItemProps> = ({ index, title, author }) => {
  return (
    <li className="topic-item">
      <span className="index">{index}</span>
      <div className="content">
        <span className="title">{title}</span>
        {/* <span className="author">{author}</span> */}
      </div>
      <span className="actions">...</span>
    </li>
  );
};

interface TopicListProps {
  topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  return (
    <ul className="topic-list">
      {topics.map((topic, index) => (
        <TopicItem
          key={index}
          index={index + 1}
          title={topic.name}
          author={topic.creator.fullName}
        />
      ))}
    </ul>
  );
};

export default TopicList;
