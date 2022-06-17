import { useState, useEffect } from 'react';

import useAxios from '../hooks/useAxios';
import './ContractList.scss';

export default function ContractList() {
  const [contract, setContract] = useState();

  useEffect(() => {
    (async () => {
      const contractArray = await useAxios('/users/user/contract', 'get');
      setContract(contractArray.contract);
    })();
  }, []);

  const handleOpenPdf = (url) => {
    const iframe =
      "<iframe width='100%' height='100%' src='" + url + "'></iframe>";
    const newTap = window.open();

    newTap.document.open();
    newTap.document.write(iframe);
    newTap.document.close();
  };

  return (
    <div className='contract-container'>
      <div className='contract-heading'>계약서</div>
      {contract &&
        contract.map((doc, index) => {
          return (
            <a key={index} className='contract-list' href={doc.contract.pdfURI}>
              {doc.contract.auctionNumber} 계약서
            </a>
          );
        })}
    </div>
  );
}
