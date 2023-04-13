import TagsReact from "./Tags";

import { useEffect, useState } from "react";

import type { Submission } from "../types";
import "./SubmissionTable.css";

export default function SubmissionTable({
  submissions,
}: {
  submissions: Submission[];
}) {

  const [submissionList, setSubmissionList] = useState(submissions);
	const [listHasChanged, setListHasChanged] = useState(false)

	useEffect(() => {
		if (listHasChanged) {
			setListHasChanged(false)
		}
	}, [listHasChanged])

  return (
    <div className="submissiontable_container">
      <table className="submissiontable">
        <thead>
          <tr>
            <th
              onClick={() => {
                setSubmissionList(
                  submissionList.sort((a, b) => {
                    if (a.author.name < b.author.name) {
                      return -1;
                    }
                    if (a.author.name > b.author.name) {
                      return 1;
                    }
                    return 0;
                  })
                );
								setListHasChanged(true)
              }}
              className="author_th"
            >
              Author
            </th>
            <th
              onClick={() => {
                setSubmissionList(
                  submissionList.sort((a, b) => {
                    if (a.headline < b.headline) {
                      return -1;
                    }
                    if (a.headline > b.headline) {
                      return 1;
                    }
                    return 0;
                  })
                );
								setListHasChanged(true)
              }}
              className="title_th"
            >
              Title
            </th>
            <th className="tag_th">Tags</th>
          </tr>
        </thead>
        <tbody>
          {submissionList.map((submission) => (
            <tr key={submission.slug}>
              <td className="submissiontable_td">
                <a className="submissiontable_author" href={submission.author.slug}>{submission.author.name}</a>
              </td>
              <td className="submissiontable_td">
                <a href={submission.slug}>{submission.headline}</a>
              </td>
              <td className="submissiontable_td">
                <TagsReact tags={submission.tags} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
