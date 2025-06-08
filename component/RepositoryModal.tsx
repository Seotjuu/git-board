'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const RepositoryModal = () => {
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [repos, setRepos] = useState<any[]>([]);

  const clickRepoEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    setIsOpen(false);
  }
  
  useEffect(() => {
    if(searchParams.has("repo")){
      setIsOpen(false)
    }

    setRepos([
      "repo1",
      "repo2",
      "repo3",
    ])
  }, [])

  return (
    <>
    {
      isOpen ?
      <div className="absolute z-25 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="w-1/3 bg-white rounded-lg shadow-lg py-5">
          <div className="rounded-t-lg flex items-center justify-between px-5">
            <h1 className="font-bold text-xl">원격 저장소 선택</h1>
          </div>
          <div className="px-5 pt-5 min-h-[300px]">
            {
              repos.length ?
              <ul className="flex flex-col gap-2">  
                {repos.map((repo, index) => (
                  <Link key={index} href={`/dashboard?repo=${repo}`}>
                    <li id={repo} className="cursor-pointer hover:bg-gray-200 py-2 px-3 flex items-center justify-between rounded-lg bg-gray-100"
                      onClick={clickRepoEvent}
                    >
                      {repo}
                      <FaArrowRight size={15} color="gray" />
                    </li>
                  </Link>
                ))}
              </ul>
              :
              <div>
                저장소가 존재하지 않습니다.
              </div>
            }
          </div>
        </div>
      </div>
    :
      null
    }
    </>
  );
}

export default RepositoryModal;