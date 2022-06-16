import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

export default function ContractList() {
  const [contract, setContract] = useState();

  useEffect(() => {
    (async () => {
      const contractArray = await useAxios('/users/user/contract', 'get');
      console.log(contractArray.contract);
      setContract(contractArray.contract);
    })();
  }, []);

  const handleOpenPdf = (event) => {
    const url = event.target.id;
    const iframe =
      "<iframe width='100%' height='100%' src='" + url + "'></iframe>";
    const newTap = window.open();
    newTap.document.open();
    newTap.document.write(iframe);
    newTap.document.close();
  };

  return (
    <>
      <div>계약서</div>
      {contract &&
        contract.map((doc, index) => {
          return (
            <>
              <div key={index} id={doc} onClick={handleOpenPdf}>
                {index}번째 계약서
              </div>
              <br></br>
            </>
          );
        })}
    </>
  );
}
