import { tagMap } from "../maps";

import type { Tag } from "../types";
import "./Tags.css";

export default function TagsReact({ tags }: { tags: Tag[] }) {
  return (
    <div className="tagpill_container">
      {tags.map((tag) => (
        <a href={"/tag/" + tag} key={tag}>
          <span className={"tagpill " + tag} >
            {tagMap.get(tag) || tag.toLocaleUpperCase()}
          </span>
          &nbsp;
        </a>
      ))}
    </div>
  );
}
