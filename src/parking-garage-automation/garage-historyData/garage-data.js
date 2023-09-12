import { Button, Table, Pagination, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import styles from "./garage-data.module.css";
import { useDispatch, useSelector } from "react-redux";
import {getHistoryByPlateThunk, getHistoryThunk, getSelectedHistoryThunk} from "../../services/parkHistoryThunk";
import Posts from "./Item";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { utils, writeFile } from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const GarageData = () => {
  const [historyPosts, setHistoryPosts] = useState([]);
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  const [active, setActivePage] = useState(1);
  let [plate, setPlate] = useState("");

  const { loading, history } = useSelector((state) => state.parkHistory);

  const date = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  const plates = {
    plate: plate,
  };
  const dispatch = useDispatch();
  const searchClickHandler = () => {
    //console.log(date)
    dispatch(getSelectedHistoryThunk(date));
  };
  const searchClickHandler2 = () => {
    //console.log(plates)
    dispatch(getHistoryByPlateThunk(plates));
  };

  const paginationClickHandler = React.useCallback(
    (number) => {
      let tempArr = [];
      for (let i = number * 10 - 10; i <= number * 10 - 1; i++) {
        if (i < history.length) {
          tempArr.push(history[i]);
        }
      }
      setActivePage(number);
      setHistoryPosts(tempArr);
    },
    [history]
  );

  const pageNumbers = Math.ceil(history.length / 10);

  let items = [];
  for (let number = 1; number <= pageNumbers; number++) {
    items.push(
      <Pagination.Item
        onClick={() => paginationClickHandler(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handleExportXLS = () => {
    let rowData = [["#", "Plate Number", "Enter Time", "Exit Time", "price"]]; // 設置column名
    history.forEach((data) => {
      // 製造一個新的array，加上資料和column
      rowData.push([
        data.id,
        data.plate,
        data.entrance,
        data.exit,
        data.parkingFee,
      ]);
    });
    const wb = utils.book_new(); // 製造一個excel work book(workbook裡可以有很多worksheet，work sheet 為 excel file裡面的一個表)
    const ws = utils.aoa_to_sheet(rowData); // 用aoa_to_sheet 轉換 rowData 裡的資料成excel worksheet object
    utils.book_append_sheet(wb, ws, "Sheet1"); // 使用 book_append_sheet 將work sheet 加到work book
    writeFile(wb, "parkingHistory.xlsx"); // 使用writeFile 將work book 寫入 excel file
  };

  // useEffect ( () => {
  //     const first = async ()=>{
  //         await dispatch(getHistoryThunk())
  //         paginationClickHandler(1)
  //     }
  //     first()
  //
  // }, [dispatch,paginationClickHandler]);

  useEffect(() => {
    dispatch(getHistoryThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) {
      paginationClickHandler(1);
    }
  }, [loading, paginationClickHandler]);

  return (
    <>
      <div className="row bg-primary text-white py-3">
        <h1 className="col-12 text-center">PARKING HISTORY</h1>
      </div>
      <br/>
      {/*{*/}
      {/*    currentUser == null &&*/}
      {/*    <div className="row text-white mt-5 mb-3">*/}
      {/*    <h1>Please Log In </h1>*/}
      {/*    </div>*/}
      {/*}*/}
      {/*}*/}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden mt-5">Loading...</span>
        </Spinner>
      )}
      {!loading && (
        <>
          <div className="row">
            <div className={`col-1 text-white ${styles.textRight}`}>
              <h3>From: </h3>
            </div>
            <div className={`col-2 mt-2 ${styles.textLeft}`}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
            <div className={`col-1 text-white ${styles.textRight}`}>
              <h3>To: </h3>
            </div>
            <div className={`col-2 mt-2 ${styles.textLeft}`}>
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
              />
            </div>
            <div className={`col-2 ${styles.textLeft}`}>
              <Button onClick={searchClickHandler} variant="warning">
                Search
              </Button>
            </div>
          </div>

          <div className="row">
            <div className={`col-1 text-white ${styles.textRight}`}>
              <h3>Plate: </h3>
            </div>

            <div className={`col-2 ${styles.textLeft}`}>
              <input
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
                className="form-control"
                type="username"
              />
            </div>

            <div className={`col-2 ${styles.textLeft}`}>
              <Button onClick={searchClickHandler2} variant="warning">
                Search
              </Button>
            </div>

            <div className={`col-6 mr-5 ${styles.textRight}`}>
              <Button
                className="ml-4 mr-2"
                variant="primary"
                onClick={handleExportXLS}
              >
                {<span>Export File</span>}
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </div>
          </div>

          {history.length === 0 && (
            <h3 className={`mt-5 text-white`}>
              There is no such data. Please try again.
            </h3>
          )}
          {history.length !== 0 && (
            <div className="row me-4">
              <div className="col-12">
                <Table
                  striped
                  bordered
                  hover
                  className={`mt-1`}
                  variant="light"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Plate Number</th>
                      <th>Enter Time</th>
                      <th>Exit Time</th>
                      <th>price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <Posts historyPosts={historyPosts}></Posts>
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          <div>
            <Pagination className="justify-content-end me-5">
              {items}
            </Pagination>
            <br />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </>
  );
};
export default GarageData;
