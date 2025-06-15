'use client';

import { CgSpinner } from "react-icons/cg";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaArrowRight, FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";

const RepositoryModal = () => {
  const session = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [repos, setRepos] = useState<any[] | null>(null);

  const resetRepo = () => {
    localStorage.removeItem("repo");
    setIsOpen(true);
  }

  const clickRepoEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    setIsOpen(false);

    localStorage.setItem("repo", JSON.stringify(repos!.find((repo: any) => repo.name === id)));
  }

  const getRepositoryList = async () => {
    try {
      await fetch(`/api/repos`)
        .then((res) => {
          res.json().then((data) => {
            setRepos(data);
          })
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("repo")) {
      setIsOpen(true)
    }

    session && getRepositoryList();
  }, [])

  return (
    <>
      <FaExchangeAlt onClick={resetRepo} className="size-7 rounded-xl cursor-pointer hover:bg-gray-100 p-1" />
      {
        isOpen ?
          <div className="absolute z-25 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="w-1/3 bg-white rounded-lg shadow-lg py-5">
              <div className="rounded-t-lg flex items-center justify-between px-5">
                <h1 className="font-bold text-xl">원격 저장소 선택</h1>
              </div>
              <div className="px-5 pt-5 w-full min-h-[300px] flex items-center justify-center">
                {
                  repos === null ?
                    <CgSpinner className="animate-spin items-center" size={40} />
                    :
                    (
                      repos.length ?
                        <ul className="w-full flex flex-col gap-2">
                          {repos.map((repo, index) => (
                            <Link key={index} href={`/dashboard?repo=${repo.name}`} className="w-full">
                              <li id={repo.name} className="cursor-pointer hover:bg-gray-200 py-2 px-3 font-bold flex items-center justify-between rounded-lg bg-gray-100"
                                onClick={clickRepoEvent}
                              >
                                {repo.name}
                                <FaArrowRight size={15} color="gray" />
                              </li>
                            </Link>
                          ))}
                        </ul>
                        :
                        <div>
                          저장소가 존재하지 않습니다.
                        </div>
                    )
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