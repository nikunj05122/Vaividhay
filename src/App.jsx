/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";

import Papa from "papaparse";
import Markdown from "react-markdown";
import Copy from "./copy.svg";
import 'react-toastify/dist/ReactToastify.css';
import lodash from "lodash";
import JSZip from "jszip";

function App() {
    const [CSVData, setCSVData] = useState([]);
    const [JSONData, setJSONData] = useState([]);
    const [JSONFinalData, setJSONFinalData] = useState({});
    const [downloadBtn, setDownloadBtn] = useState(false);
    const [complate, setComplate] = useState([]);
    const [complateSub, setComplateSub] = useState([]);
    const [eventCount, setEventCount] = useState([]);
    const [eventCountCopy, setEventCountCopy] = useState([]);
    const [option, setOption] = useState("1");
    var commonConfig = { delimiter: "," };

    const zip = new JSZip();


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

    const downloadFile = (data, value, i) => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        zip.file(`${i} ${value}.csv`, blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${i} ${value}.csv`;
        const sparater = document.createElement('div');
        sparater.className="link-sparater"
        document.getElementById("all-link").appendChild(a);
        document.getElementById("all-link").appendChild(sparater);
        a.innerText = `${i} ${value}.csv`
    }

    const downloadAll = async () => {
        const zipData = await zip.generateAsync({
            type: "blob",
            streamFiles: true,
          });

          const link = document.createElement("a");
        link.href = window.URL.createObjectURL(zipData);
        link.download = "Event-wise-data.zip";
        link.click();
        document.removeChild(link);
    }

    useEffect(() => {
        if (downloadBtn) {
            let i = 1;
            for (const [key, value] of Object.entries(JSONFinalData)) {
                const final = value.map(data => {
                    delete data["Computer Engineering Events"];
                    delete data["Civil Engineering Events"];
                    delete data["Mechanical Engineering Events"];
                    delete data["E & C Engineering Events"];
                    delete data["MSC IT Events"];
                    delete data["Information Technology Events"];
                    delete data["H & SS Events"];
                    delete data["BIS Event"];
                    delete data["Drone Event (E & C Dept)"];
                    return data;
                })

                downloadFile(final, key, i);
                i++;
            }
            downloadFile(eventCount, 'eventCountFile', i);
        } 
    }, [downloadBtn])

    useEffect(() => {
        if (Object.keys(JSONFinalData).length > 0) {
            const data = {}
            data["Computer"] = [
                {
                    "event no": 1,
                    "Department": "Computer",
                    "event": "Break the Query",
                    "No. Person": JSONFinalData["Break the Query"] ? JSONFinalData["Break the Query"].length : 0,
                    "Ticket No": JSONFinalData["Break the Query"] ? JSONFinalData["Break the Query"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 2,
                    "Department": "Computer",
                    "event": "Knowledge Knockout",
                    "No. Person": JSONFinalData["Knowledge Knockout"] ? JSONFinalData["Knowledge Knockout"].length : 0,
                    "Ticket No": JSONFinalData["Knowledge Knockout"] ? JSONFinalData["Knowledge Knockout"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 3,
                    "Department": "Computer",
                    "event": "Blogoasis",
                    "No. Person": JSONFinalData["Blogoasis"] ? JSONFinalData["Blogoasis"].length : 0,
                    "Ticket No": JSONFinalData["Blogoasis"] ? JSONFinalData["Blogoasis"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["Civil"] = [
                {
                    "event no": 4,
                    "Department": "Civil",
                    "event": "Sky Traverse",
                    "No. Person": JSONFinalData["Sky Traverse"] ? JSONFinalData["Sky Traverse"].length : 0,
                    "Ticket No": JSONFinalData["Sky Traverse"] ? JSONFinalData["Sky Traverse"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 5,
                    "Department": "Civil",
                    "event": "Magical Burst",
                    "No. Person": JSONFinalData["Magical Burst"] ? JSONFinalData["Magical Burst"].length : 0,
                    "Ticket No": JSONFinalData["Magical Burst"] ? JSONFinalData["Magical Burst"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 6,
                    "Department": "Civil",
                    "event": "Hungry Porter",
                    "No. Person": JSONFinalData["Hungry Porter"] ? JSONFinalData["Hungry Porter"].length : 0,
                    "Ticket No": JSONFinalData["Hungry Porter"] ? JSONFinalData["Hungry Porter"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 7,
                    "Department": "Civil",
                    "event": "Lost in Clue",
                    "No. Person": JSONFinalData["Lost in Clue"] ? JSONFinalData["Lost in Clue"].length : 0,
                    "Ticket No": JSONFinalData["Lost in Clue"] ? JSONFinalData["Lost in Clue"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 8,
                    "Department": "Civil",
                    "event": "Lego Craft",
                    "No. Person": JSONFinalData["Lego Craft"] ? JSONFinalData["Lego Craft"].length : 0,
                    "Ticket No": JSONFinalData["Lego Craft"] ? JSONFinalData["Lego Craft"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 9,
                    "Department": "Civil",
                    "event": "Costuctopia",
                    "No. Person": JSONFinalData["Costuctopia"] ? JSONFinalData["Costuctopia"].length : 0,
                    "Ticket No": JSONFinalData["Costuctopia"] ? JSONFinalData["Costuctopia"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["E & C"] = [
                {
                    "event no": 15,
                    "Department": "E & C",
                    "event": "Codevita",
                    "No. Person": JSONFinalData["Codevita"] ? JSONFinalData["Codevita"].length : 0,
                    "Ticket No": JSONFinalData["Codevita"] ? JSONFinalData["Codevita"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 16,
                    "Department": "E & C",
                    "event": "Auction Mania",
                    "No. Person": JSONFinalData["Auction Mania"] ? JSONFinalData["Auction Mania"].length : 0,
                    "Ticket No": JSONFinalData["Auction Mania"] ? JSONFinalData["Auction Mania"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 17,
                    "Department": "E & C",
                    "event": "Circuitrix",
                    "No. Person": JSONFinalData["Circuitrix"] ? JSONFinalData["Circuitrix"].length : 0,
                    "Ticket No": JSONFinalData["Circuitrix"] ? JSONFinalData["Circuitrix"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 18,
                    "Department": "E & C",
                    "event": "Kaun Banega Engineer",
                    "No. Person": JSONFinalData["Kaun Banega Engineer"] ? JSONFinalData["Kaun Banega Engineer"].length : 0,
                    "Ticket No": JSONFinalData["Kaun Banega Engineer"] ? JSONFinalData["Kaun Banega Engineer"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["MSC IT"] = [
                {
                    "event no": 23,
                    "Department": "MSC IT",
                    "event": "Code Blind Spot",
                    "No. Person": JSONFinalData["Code Blind Spot"] ? JSONFinalData["Code Blind Spot"].length : 0,
                    "Ticket No": JSONFinalData["Code Blind Spot"] ? JSONFinalData["Code Blind Spot"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 24,
                    "Department": "MSC IT",
                    "event": "C-Enigma",
                    "No. Person": JSONFinalData["C-Enigma"] ? JSONFinalData["C-Enigma"].length : 0,
                    "Ticket No": JSONFinalData["C-Enigma"] ? JSONFinalData["C-Enigma"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["Information Technology"] = [
                {
                    "event no": 21,
                    "Department": "Information Technology",
                    "event": "Imaginarium",
                    "No. Person": JSONFinalData["Imaginarium"] ? JSONFinalData["Imaginarium"].length : 0,
                    "Ticket No": JSONFinalData["Imaginarium"] ? JSONFinalData["Imaginarium"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 22,
                    "Department": "Information Technology",
                    "event": "Reel Crafter",
                    "No. Person": JSONFinalData["Reel Crafter"] ? JSONFinalData["Reel Crafter"].length : 0,
                    "Ticket No": JSONFinalData["Reel Crafter"] ? JSONFinalData["Reel Crafter"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 20,
                    "Department": "Information Technology",
                    "event": "Digital Detective",
                    "No. Person": JSONFinalData["Digital Detective"] ? JSONFinalData["Digital Detective"].length : 0,
                    "Ticket No": JSONFinalData["Digital Detective"] ? JSONFinalData["Digital Detective"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["H & SS"] = [
                {
                    "event no": 25,
                    "Department": "H & SS",
                    "event": "English Big Bash",
                    "No. Person": JSONFinalData["English Big Bash"] ? JSONFinalData["English Big Bash"].length : 0,
                    "Ticket No": JSONFinalData["English Big Bash"] ? JSONFinalData["English Big Bash"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 26,
                    "Department": "H & SS",
                    "event": "Physiquest",
                    "No. Person": JSONFinalData["Physiquest"] ? JSONFinalData["Physiquest"].length : 0,
                    "Ticket No": JSONFinalData["Physiquest"] ? JSONFinalData["Physiquest"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 27,
                    "Department": "H & SS",
                    "event": "Math Brain",
                    "No. Person": JSONFinalData["Math Brain"] ? JSONFinalData["Math Brain"].length : 0,
                    "Ticket No": JSONFinalData["Math Brain"] ? JSONFinalData["Math Brain"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["BIS"] = [
                {
                    "event no": 28,
                    "Department": "BIS",
                    "event": "BIS Standard Poster Presentation",
                    "No. Person": JSONFinalData["BIS Standard Poster Presentation"] ? JSONFinalData["BIS Standard Poster Presentation"].length : 0,
                    "Ticket No": JSONFinalData["BIS Standard Poster Presentation"] ? JSONFinalData["BIS Standard Poster Presentation"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["Drone"] = [
                {
                    "event no": 19,
                    "Department": "Drone",
                    "event": "Drone Showcase",
                    "No. Person": JSONFinalData["Drone Showcase"] ? JSONFinalData["Drone Showcase"].length : 0,
                    "Ticket No": JSONFinalData["Drone Showcase"] ? JSONFinalData["Drone Showcase"].map(data => data["Tickit no:"]) : []
                },
            ]
            data["Mechanical"] = [
                {
                    "event no": 10,
                    "Department": "Mechanical",
                    "event": "Hot Wheels",
                    "No. Person": JSONFinalData["Hot Wheels"] ? JSONFinalData["Hot Wheels"].length : 0,
                    "Ticket No": JSONFinalData["Hot Wheels"] ? JSONFinalData["Hot Wheels"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 11,
                    "Department": "Mechanical",
                    "event": "Catalupting Firelock",
                    "No. Person": JSONFinalData["Catalupting Firelock"] ? JSONFinalData["Catalupting Firelock"].length : 0,
                    "Ticket No": JSONFinalData["Catalupting Firelock"] ? JSONFinalData["Catalupting Firelock"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 12,
                    "Department": "Mechanical",
                    "event": "BGMI",
                    "No. Person": JSONFinalData["BGMI"] ? JSONFinalData["BGMI"].length : 0,
                    "Ticket No": JSONFinalData["BGMI"] ? JSONFinalData["BGMI"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 13,
                    "Department": "Mechanical",
                    "event": "Free Fire Max",
                    "No. Person": JSONFinalData["Free Fire Max"] ? JSONFinalData["Free Fire Max"].length : 0,
                    "Ticket No": JSONFinalData["Free Fire Max"] ? JSONFinalData["Free Fire Max"].map(data => data["Tickit no:"]) : []
                },
                {
                    "event no": 14,
                    "Department": "Mechanical",
                    "event": "Robo Grip",
                    "No. Person": JSONFinalData["Robo Grip"] ? JSONFinalData["Robo Grip"].length : 0,
                    "Ticket No": JSONFinalData["Robo Grip"] ? JSONFinalData["Robo Grip"].map(data => data["Tickit no:"]) : []
                },
            ]
            setEventCountCopy(data);
            setEventCount([...data["Computer"], ...data["Civil"], ...data["E & C"], ...data["Information Technology"], ...data["H & SS"], ...data["BIS"], ...data["Drone"], ...data["Mechanical"]]);
            setTimeout(() => {
                setDownloadBtn(true);
            }, 2000);
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
                                    navigator.clipboard.writeText(`Confirmation of Registration for Vaividhya 2024`);
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
                Download The Event according csv file. Upload file hear.
                </h2>
                <input
                    className="input-file link-sparater"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            dowloadFile(files[0]);
                        }
                    }}
                    />
                    {downloadBtn && (<button className="btn"onClick={() => downloadAll()} >Download Event zip</button>)}
                {eventCountCopy && Object.keys(eventCountCopy).map(key => {
                    const value = eventCountCopy[key];
                    const content = `${key} (Total : ${value.map(data => data["No. Person"]).reduce((total, num) => total + num)})\n\r
${value.map(data => `${data.event} - ${data["No. Person"]}`).join('\n\r')}`
                    return(
                        <>
                            <div className={`code-box `} >
                                <Markdown className="code-content">
                                    {content}
                                </Markdown>
                                <img className="code-copy" src={Copy} alt="" onClick={() => {
                                    navigator.clipboard.writeText(content);
                                    // toast.success(`${user} Subject Copied.`)
                                }} />
                            </div>
                        </>
                    )
                })}
                <div id="all-link"></div>
            </div>
            </>)}
        </>
    );
}

export default App;
