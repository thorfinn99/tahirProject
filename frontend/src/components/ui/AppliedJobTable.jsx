import React from 'react'
import { useSelector } from 'react-redux';

function AppliedJobTable() {
  const {allAppliedJobs} = useSelector(store=>store.job)
  return (
    <div>
       <div className="max-w-5xl mx-auto my-5">
            <table className="min-w-full border border-gray-300 bg-white shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Job Role</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  allAppliedJobs.length === 0 ? <span>You Have Not Applied For Any Jobs Yet</span> : (allAppliedJobs.map((appliedJob) => (
                    <tr key={appliedJob._id} className="border-b">
                      <td className="p-3">{appliedJob?.createdAt.split("T")[0]}</td>
                      <td className="p-3">{appliedJob?.job?.title}</td>
                      <td className="p-3">{appliedJob?.job?.company?.name}</td>
                      <td className="p-3 font-semibold ">{appliedJob?.status}</td>
                    </tr>
                  )))
                }
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default AppliedJobTable
