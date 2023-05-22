import TagsReact from "./Tags";

import { useEffect, useState } from "react";

import "./SubmissionTable.css";
import type { CollectionEntry } from "astro:content";

export default function SubmissionTable({ entries }: { entries: CollectionEntry<"submissions">[] }
) {

  const [submissions, setSubmissions] = useState(entries || []);

  return (
    <div className="submissiontable_container">
      <table className="submissiontable">
        <thead>
          <tr>
            <th
              onClick={() => {
                setSubmissions(
                  [...submissions.sort((a, b) => {
                    if (a.data.author.name < b.data.author.name) {
                      return -1;
                    }
                    if (a.data.author.name > b.data.author.name) {
                      return 1;
                    }
                    return 0;
                  })]
                );
            
              }}
              className="author_th"
            >
              Author
            </th>
            <th
              onClick={() => {
                setSubmissions(
                  [...submissions.sort((a, b) => {
                    return a.data.headline.localeCompare(b.data.headline);
                  })]
                );
              }}
              className="title_th"
            >
              Title
            </th>
            <th className="tag_th">Tags</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission: CollectionEntry<"submissions">) => (
            <tr key={submission.slug}>
              <td className="submissiontable_td">
                <a
                  className="submissiontable_author"
                  href={"/author/" + submission.data.author.slug}
                >
                  {submission.data.author.name}
                </a>
              </td>
              <td className="submissiontable_td">
                <a className="submissiontable_title" href={"/submission/" + submission.slug}>{submission.data.headline}</a>
              </td>
              <td className="submissiontable_td">
                <TagsReact tags={submission.data.tags} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
