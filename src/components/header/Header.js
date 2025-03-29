import React from "react";
import "./Header.css";

const Header = ({
    collections,
    collectionActiveName,
    handleUpdateCollections,
    handleChangeCollection,
}) => {
    const handleUploadFileData = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const jsonData = JSON.parse(event.target.result);
                sessionStorage.setItem("flashcard-data", jsonData);
                handleUpdateCollections(JSON.parse(jsonData));
            };
            reader.readAsText(file);
        }
        e.target.value = "";
    }
    const handleExportJsonFile = (e) => {
        e.target.href = "data:application/json;charset=utf-8," + (JSON.stringify(sessionStorage.getItem("flashcard-data")));
        e.target.download = "flashcard-data.json";
    }
    
    return (
        <header>
            <div className="file">
                <div className="import">
                    <label htmlFor="file-upload" className="btn">Upload file data</label>
                    <input type='file' name='' id="file-upload" onChange={handleUploadFileData} accept="application/json"/>
                </div>
                <div className="export">
                    <a className="btn" onClick={handleExportJsonFile}>Export</a>
                </div>
            </div>
            <div className='divide-space'></div>
            <div className='collections'>
                {collections.length > 0 &&
                    collections.map((element, index) => {
                        return (
                            <>
                                <div
                                    key={index}
                                    className={`collection ${
                                        collectionActiveName ===
                                            element.collection && "active"
                                    }`}
                                    onClick={() => {handleChangeCollection(element)}}
                                >
                                    <p>{element.collection}</p>
                                </div>
                            </>
                        );
                    })}
            </div>
        </header>
    );
};

export default Header;
