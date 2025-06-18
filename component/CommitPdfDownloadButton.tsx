'use client'

import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface IProps {
  commitList: any[] | null; 
}

const CommitPdfDownloadButton = ({commitList}: IProps) => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  
  const downloadPDF = async () => {
    const res = await fetch('/api/report');
    // const res = await fetch("http://localhost:8000/report", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(commitList), // Next.js에서 보내는 커밋 데이터
    // });

    const blob = await res.blob();
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'commit_report.pdf';
    a.click();
    setUrl(url)
  };

  useEffect(() => {
      if(url) {
          setLoading(false)
          setUrl("")
      }
  }, [loading, url]);

  return (
    <>
      <button className="absolute bottom-5 right-5 rounded-full shadow-xl p-2 text-white bg-blue-500 hover:bg-blue-800 cursor-pointer"
        onClick={() => {
            downloadPDF();
            setLoading(true);
        }}
      >
        PDF
      </button>

      {loading ?
        <>
          <div className="absolute w-full h-full left-0 top-0 opacity-25 bg-black flex items-center justify-center"></div>
          <div className="absolute  w-full h-full left-0 top-0 flex flex-col items-center gap-2">
              <div className="font-bold h-screen flex flex-col items-center justify-center gap-5 text-white">
                  PDF 다운로드 중...
                  <CgSpinner size={50} className=" animate-spin" />
              </div>
          </div>
        </>
      :
        null
      }
    </>
  )
}

export default CommitPdfDownloadButton;