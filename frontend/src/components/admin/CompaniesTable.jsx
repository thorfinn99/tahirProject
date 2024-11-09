import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdEdit } from "react-icons/md";

function CompaniesTable({input}) {
  const { companies, filterWord } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(()=> {
      const filteredCompanies = companies.length >= 0 && companies.filter((company)=> {
        if(!filterWord){
          return true
        }
        return company?.name?.toLowerCase().includes(filterWord.toLowerCase())
      })
      setFilterCompany(filteredCompanies)
  },[companies, filterWord])


  return (
    <div>
      <div className="max-w-5xl mt-7 mx-auto my-5">
        <table className="min-w-full border border-gray-300 bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Registered</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          {companies.length <= 0 ? (
            <div className="my-5" >
            <span className="" >No Company Registered Yet..</span>
      </div>
          ) : (
            <>
              {filterCompany?.map((company) => {
                return (
                    <tbody>
                        <tr key={company._id} className="border-b">
                          <img src={company.logo} className="h-11 p-2"></img>
                          <td className="p-3">{company.name}</td>
                          <td className="p-3">{company.createdAt.split("T")[0]}</td>
                          <td className="p-3 ">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Avatar className=" cursor-pointer">
                                  <BsThreeDotsVertical className="text-gray-600 ml-5 cursor-pointer" />
                                </Avatar>
                              </PopoverTrigger>
                              <PopoverContent className=" bg-gray-100 border-0 p-4 shadow-md outline-0 w-52">
                                <div className=" flex pt-2 gap-9 ">

                                  <div onClick={()=> navigate(`/admin/companies/${company._id}`) } class=" flex ">
                                    <Link to="">
                                      <div class="relative p-1 flex items-center gap-2 text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                                        <MdEdit />
                                        <span>Edit</span>
                                      </div>
                                    </Link>
                                  </div>

                                  <div class=" flex ">
                                    <div class="relative p-1 flex items-center gap-2 text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                                      <MdDeleteForever />
                                      <button className="text-red-500">
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </td>
                        </tr>
                    </tbody>
                );
              })}
            </>
          )}
        </table>
      </div>
    </div>
  );
}

export default CompaniesTable;
