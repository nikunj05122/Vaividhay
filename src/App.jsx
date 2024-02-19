import { useState } from "react";
import "./App.css";

import Papa from "papaparse";
import Markdown from "react-markdown";
import Copy from "./copy.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [CSVData, setCSVData] = useState([]);
    const [complate, setComplate] = useState([]);
    const [complateSub, setComplateSub] = useState([]);
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

    return (
        <>
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
        </>
    );
}

export default App;
