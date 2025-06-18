'use client'

import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const CommitPdfDownloadButton = () => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const downloadPDF = async () => {
    const res = await fetch('/api/report');
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
          <div className="absolute top-0 w-screen h-screen opacity-25 bg-black flex items-center justify-center"></div>
          <div className="absolute w-screen h-screen top-0 flex flex-col items-center gap-2">
              
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