import "./App.css";
import Card from "./components/card/Card";
import arrowLeftIcon from "./asserts/arrow-left-icon.svg";
import arrowRightIcon from "./asserts/arrow-right-icon.svg";
import { useState } from "react";

import data from "./data/data.json";

function App() {
    if (!sessionStorage.getItem("flashcard-data")) {
        sessionStorage.setItem("flashcard-data", JSON.stringify(data));
    }

    const [dataInit, setDataInit] = useState(
        JSON.parse(sessionStorage.getItem("flashcard-data"))
    );
    const [collectionActive, setCollectionActive] = useState(dataInit[0]);
    const [vocabularyActiveIndex, setVocabularyActiveIndex] = useState(0);
    const [vocabularyActive, setVocabularyActive] = useState(
        collectionActive.vocabularies[0]
    );
    const [isShowVn, setIsShow] = useState(false);

    const handleShow = () => {
        setIsShow(!isShowVn);
    };

    const handlePrevVocabulary = () => {
        if (vocabularyActiveIndex > 0) {
            let index = vocabularyActiveIndex - 1;

            setVocabularyActive(collectionActive.vocabularies[index]);
            setVocabularyActiveIndex(index);
            isShowVn && setIsShow(false);
        }
    };

    const handleNextVocabulary = () => {
        if (vocabularyActiveIndex < collectionActive.vocabularies.length - 1) {
            let index = vocabularyActiveIndex + 1;

            setVocabularyActive(collectionActive.vocabularies[index]);
            setVocabularyActiveIndex(index);
            isShowVn && setIsShow(false);
        }
    };

    return (
        <div className='App'>
            <header>
                <input type="file" name="" id="" />
            </header>
            <Card
                vocabulary={vocabularyActive}
                isShowVn={isShowVn}
                handleShow={handleShow}
            />
            <div className='divide-space'></div>
            <div className='navigate'>
                <div
                    className='btn prev-btn'
                    onClick={() => {
                        handlePrevVocabulary();
                    }}>
                    <img
                        className={`arrow-icon ${
                            vocabularyActiveIndex === 0 && "disable-btn"
                        }`}
                        src={arrowLeftIcon}
                        alt='previous-icon'
                    />
                </div>
                <div className='distance-space'></div>
                <div
                    className='btn next-btn'
                    onClick={() => {
                        handleNextVocabulary();
                    }}>
                    <img
                        className={`arrow-icon ${
                            vocabularyActiveIndex === (collectionActive.vocabularies.length - 1) && "disable-btn"
                        }`}
                        src={arrowRightIcon}
                        alt='next-icon'
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
