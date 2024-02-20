import { useState, useEffect } from "react";
import "./App.css";

import Papa from "papaparse";
import Markdown from "react-markdown";
import Copy from "./copy.svg";
import 'react-toastify/dist/ReactToastify.css';
import lodash from "lodash";

function App() {
    const [CSVData, setCSVData] = useState([]);
    const [JSONData, setJSONData] = useState([]);
    const [JSONFinalData, setJSONFinalData] = useState({});
    const [downloadBtn, setDownloadBtn] = useState(false);
    const [complate, setComplate] = useState([]);
    const [complateSub, setComplateSub] = useState([]);
    const [option, setOption] = useState("1");
    var commonConfig = { delimiter: "," };

    function parseCSVData(file) {
        Papa.parse(file, {
            ...commonConfig,
            header: true,
            download: true,
            complete: (result) => {
                setCSVData(result.data);
            },
        });
    }

    function convertToCSV(json) {
        const config = {
            quotes: false, //or array of booleans
            quoteChar: '"',
            escapeChar: '"',
            delimiter: ",",
            header: true,
            newline: "\r\n",
            columns: null //or array of strings
        }
        return Papa.unparse(json,[config]);
      }

    const unwind = (key, obj) => {
        const { [key]: _, ...rest } = obj;
        return obj[key].map(val => ({ ...rest, [key]: val }));
    };

    const downloadFile = (data, value) => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${value}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    useEffect(() => {
        if (Object.keys(JSONFinalData).length > 0) {
            setTimeout(() => {
                setDownloadBtn(true);
            }, 5000);
        }
    }, [JSONFinalData])
    
    useEffect(() => {
        const filterData = JSONData.filter(data => data["Tickit no:"] !== "");
        
        const finalData = filterData.map(data => {
            return unwind("allEvent", data);
        });

        const groupData = lodash.groupBy(finalData.flat(), 'allEvent');
        setJSONFinalData({...groupData});
    }, [JSONData])

    function dowloadFile(file) {
        Papa.parse(file, {
            ...commonConfig,
            header: true,
            download: true,
            complete: (result) => {
                let res = [...result.data]
                res = res.map(data => {
                    data["Computer Engineering Events"] = data["Computer Engineering Events"] && data["Computer Engineering Events"] !== "" ? JSON.parse(data["Computer Engineering Events"]) : [];
                    data["Civil Engineering Events"] = data["Civil Engineering Events"] && data["Civil Engineering Events"] !== "" ? JSON.parse(data["Civil Engineering Events"]) : [];
                    data["Mechanical Engineering Events"] = data["Mechanical Engineering Events"] && data["Mechanical Engineering Events"] !== "" ? JSON.parse(data["Mechanical Engineering Events"]) : [];
                    data["E & C Engineering Events"] = data["E & C Engineering Events"] && data["E & C Engineering Events"] !== "" ? JSON.parse(data["E & C Engineering Events"]) : [];
                    data["MSC IT Events"] = data["MSC IT Events"] && data["MSC IT Events"] !== "" ? JSON.parse(data["MSC IT Events"]) : [];
                    data["Information Technology Events"] = data["Information Technology Events"] && data["Information Technology Events"] !== "" ? JSON.parse(data["Information Technology Events"]) : [];
                    data["H & SS Events"] = data["H & SS Events"] && data["H & SS Events"] !== "" ? JSON.parse(data["H & SS Events"]) : [];
                    data["BIS Event"] = data["BIS Event"] && data["BIS Event"] !== "" ? JSON.parse(data["BIS Event"]) : [];
                    data["Drone Event (E & C Dept)"] = data["Drone Event (E & C Dept)"] && data["Drone Event (E & C Dept)"] !== "" ? JSON.parse(data["Drone Event (E & C Dept)"]) : [];
                    
                    data['allEvent'] = [...data["Computer Engineering Events"], ...data["Civil Engineering Events"], ...data["Mechanical Engineering Events"], ...data["E & C Engineering Events"], ...data["MSC IT Events"], ...data["Information Technology Events"], ...data["H & SS Events"], ...data["BIS Event"], ...data["Drone Event (E & C Dept)"]];
                    
                    return data;
                });
                setJSONData([...res]);

            },
        });
    }

    return (
        <>
                    <input 
                        type="radio"
                        id="option1"
                        value="1"
                        checked={ 
                            option === '1'
                        } 
                        onChange={() => 
                            setOption( 
                                "1"
                            ) 
                        } 
                    /> 
                    <label 
                        htmlFor="option1"
                    >For mail</label> 
                    <input 
                        type="radio"
                        id="option1"
                        value="2"
                        checked={ 
                            option === '2'
                        } 
                        onChange={() => 
                            setOption( 
                                "2"
                            ) 
                        } 
                    /> 
                    <label 
                        htmlFor="option1"
                    >Download The Event according csv file</label> 
            {option === '1' && (<>
                <div className="App">
                <h2 className="file-upload-heading" htmlFor="">
                    Upload file hear.
                </h2>
                <input
                    className="input-file"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            parseCSVData(files[0]);
                        }
                    }}
                />

            </div>
            {CSVData.length > 0 &&
                CSVData.map((data) => {
                    if(data["Tickit no:"] === "") return null;
                    
                    const comEvent = data["Computer Engineering Events"] !== "" ? JSON.parse(data["Computer Engineering Events"]) : [];
                    const civilEvent = data["Civil Engineering Events"] !== "" ? JSON.parse(data["Civil Engineering Events"]) : [];
                    const mecEvent = data["Mechanical Engineering Events"] !== "" ? JSON.parse(data["Mechanical Engineering Events"]) : [];
                    const ecEvent = data["E & C Engineering Events"] !== "" ? JSON.parse(data["E & C Engineering Events"]) : [];
                    const mscEvent = data["MSC IT Events"] !== "" ? JSON.parse(data["MSC IT Events"]) : [];
                    const itEvent = data["Information Technology Events"] !== "" ? JSON.parse(data["Information Technology Events"]) : [];
                    const hssEvent = data["H & SS Events"] !== "" ? JSON.parse(data["H & SS Events"]) : [];
                    const bisEvent = data["BIS Event"] !== "" ? JSON.parse(data["BIS Event"]) : [];
                    const dronEvent = data["Drone Event (E & C Dept)"] !== "" ? JSON.parse(data["Drone Event (E & C Dept)"]) : [];

                    const allEvent = [...comEvent, ...civilEvent, ...mecEvent, ...ecEvent, ...mscEvent, ...itEvent, ...hssEvent, ...bisEvent, ...dronEvent].join(", ");

                    const user = data["Tickit no:"];

                    let subject = "";
                    let cont = "";
                    const sub = complateSub.includes(user);
                    const con = complate.includes(user);

                    if (sub && con) {
                        subject += "done";
                        cont += "done";
                    }
                    else if (sub && !con) subject += "done";
                    else if (!sub && con) cont += "done";

                    const content = `Dear ${data["Full Name (First name + Last Name)"]},
    
Congratulations! We are thrilled to confirm your registration for Vaividhya 2024, a spectacular two-day event scheduled for March 1-2, 2024, at SSASIT, Surat.

Your Participation Details:

Events Registered: ${allEvent}

Payment Confirmation: Online 
Amount: ${data["Amount To pay:"]}

Transaction ID: ${data["Add Transaction ID"]}
Ticket Information: Confirmed
Ticket Number: ${data["Tickit no:"]}
Event Venue: SSASIT, Surat

We appreciate your prompt submission of the payment screenshot, which has been successfully verified. Your dedication to participating in Vaividhya 2024 is truly commendable!

For all the latest updates, news, and important details related to the event, please visit our official website: [http://vaividhya.site/].

Feel free to share this exciting news with your friends and encourage them to join in. Let's make Vaividhya 2024 an unforgettable experience together!

Should you have any further queries or require assistance, please do not hesitate to contact us through our Contact Page: [https://www.vaividhya.site/contact].

We can't wait to welcome you on March 1-2, 2024, for an incredible experience at Vaividhya 2024!

Best regards,

Vaividhya Registration Team
SSASIT - Surat`
                    return (
                        <>
                        <div className="code-box" key={data["Tickit no:"]}>
                            <div className={`text-color`}>{data["Tickit no:"]}</div>
                            <div className={`code-box ${subject}`} key={data["Tickit no:"]}>
                                <Markdown className="code-content">
                                    {`Confirmation of Registration for Vaividhya 2024`}
                                </Markdown>
                                <img className="code-copy" src={Copy} alt="" onClick={() => {
                                    setComplateSub([user, ...complateSub]);
                                    navigator.clipboard.writeText(content);
                                    // toast.success(`${user} Subject Copied.`)
                                }} />
                            </div>
                            <div className={`code-box ${cont}`} key={data["Tickit no:"]}>
                                <Markdown className="code-content">
                                    {content}
                                </Markdown>
                                <img className="code-copy" src={Copy} alt="" onClick={() => {
                                    setComplate([user, ...complate]);
                                    navigator.clipboard.writeText(content);
                                    // toast.success(`${user} Body Copied.`)
                                }} />
                            </div>
                        </div>
                                {/* <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                    transition: Bounce
                                /> */}
                        </>
                    )
                })}
            </>)}

            {option === '2' && (<>
                <div className="App">
                <h2 className="file-upload-heading" htmlFor="">
                    Upload file hear.
                </h2>
                <input
                    className="input-file"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            dowloadFile(files[0]);
                        }
                    }}
                />
                {downloadBtn && (<button className="btn"onClick={() => {
                    for (const [key, value] of Object.entries(JSONFinalData)) {
                        downloadFile(value, key)
                      }
                }} >Download</button>)}
            </div>
            </>)}
        </>
    );
}

export default App;
