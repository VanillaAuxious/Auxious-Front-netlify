import { useState, useEffect } from 'react';

import sendAPI from '../utils/sendAPI';
import './ContractList.scss';

export default function ContractList() {
  const [contract, setContract] = useState([]);

  useEffect(() => {
    (async () => {
      const contractArray = await sendAPI('/users/user/contract', 'get');
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
            <div
              key={index}
              className='contract-list'
              onClick={handleOpenPdf.bind(null, doc.contract.pdfURI)}>
              {doc.contract.auctionNumber} 계약서
            </div>
          );
        })}
    </div>
  );
}
