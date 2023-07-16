import { tagMap } from "../maps";

import "./Tags.css";

export default function TagsReact({ tags }: { tags: string[] }) {
  return (
    <div className="tagpill_container">
      {tags.sort((a, b) => a.localeCompare(b))
      .map((tag) => (
        <a href={"#"} key={tag}>
          <span className={"tagpill " + tag} >
            {tagMap.get(tag) || tag.toLocaleUpperCase()}
          </span>
          &nbsp;
        </a>
      ))}
    </div>
  );
}
