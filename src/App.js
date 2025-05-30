import "./App.css";
import Card from "./components/card/Card";
import arrowLeftIcon from "./asserts/arrow-left-icon.svg";
import arrowRightIcon from "./asserts/arrow-right-icon.svg";
import { useEffect, useState } from "react";

import data from "./data/data.json";
import Header from "./components/header/Header";

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

    useEffect(()=>{
        setVocabularyActiveIndex(0);
        setVocabularyActive(collectionActive.vocabularies[0]);
        setIsShow(false);
    }, [collectionActive])

    const handleUpdateDataInit = (collections) => {
        setDataInit(collections);
    } 

    const handleChangeCollection = (collection) => {
        setCollectionActive(collection);
    }

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
            <Header
                collections={dataInit}
                collectionActiveName={collectionActive.collection}
                handleUpdateCollections={handleUpdateDataInit}
                handleChangeCollection={handleChangeCollection}
            />
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
