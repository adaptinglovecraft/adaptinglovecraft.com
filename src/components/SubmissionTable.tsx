import TagsReact from "./Tags";

import { useEffect, useState } from "react";

import "./SubmissionTable.css";
import { getEntry, type CollectionEntry } from "astro:content";

export default function SubmissionTable({
  entries,
}: {
  entries: CollectionEntry<"submissions">[];
}) {

  const [submissions, setSubmissions] = useState(entries || []);
  const [authors, setAuthors] = useState(new Map<string, string>());

  useEffect(() => {
    const getAuthors = async () => {
      const authors = new Map<string, string>();
      for (const submission of submissions) {
        if (!authors.has(submission.data.author.slug)) {
          const author = await getEntry("authors", submission.data.author.slug);
          authors.set(submission.data.author.slug, author.data.name);
        }
      }
      setAuthors(authors);
    };
    getAuthors();
  }, [submissions]);

  return (
    <div className="submissiontable_container">
      <table className="submissiontable">
        <thead>
          <tr>
            <th
              onClick={() => {
                setSubmissions([
                  ...submissions.sort((a, b) => {
                    if (a.data.author.slug < b.data.author.slug) {
                      return -1;
                    }
                    if (a.data.author.slug > b.data.author.slug) {
                      return 1;
                    }
                    return 0;
                  }),
                ]);
              }}
              className="author_th"
            >
              Author
            </th>
            <th
              onClick={() => {
                setSubmissions([
                  ...submissions.sort((a, b) => {
                    return a.data.title.localeCompare(b.data.title);
                  }),
                ]);
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
                  {authors.get(submission.data.author.slug)}
                </a>
              </td>
              <td className="submissiontable_td">
                <a
                  className="submissiontable_title"
                  href={"/submission/" + submission.slug}
                >
                  {submission.data.title}
                </a>
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
