import React from "react";
import "./Card.css"

const Card = ({ vocabulary, isShowVn, handleShow }) => {

    return (
        <div className="card" onClick={()=> {handleShow()}}>
            <div className={`before${isShowVn ? ' show' : ""}`}>
                <div className="jp">
                    <p className="main-txt break-word">{vocabulary.jp.main}</p>
                    <p className="transcript-txt break-word">{`(${vocabulary.jp.transcript})`}</p>
                    <p className="sub-txt break-word">{vocabulary.jp.sub}</p>
                </div>
            </div>
            <div className={`after${!isShowVn ? ' show' : ""}`}>
                <div className="vn">
                    <p className="translate-txt break-word">{vocabulary.vn.translate}</p>
                    <p className="note-txt break-word">{vocabulary.vn.note}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
