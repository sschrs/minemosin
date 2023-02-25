/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React from "react";
import { Link } from "react-router-dom";

import { BsGithub } from 'react-icons/bs'
import { SiBuymeacoffee } from 'react-icons/si'
import { BiWorld } from 'react-icons/bi'
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
    const { t, i18n } = useTranslation();

    const changeLang = (lang) => {
        window.electron.changeLanguage(lang);
        i18n.changeLanguage(lang);
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <h1>{t('settings.title')}</h1>
                    <label>{t('settings.language')}:</label>

                    <select className="form-control" onChange={e => changeLang(e.target.value)}>
                        <option value="en" key="en" selected={i18n.language === 'en'} >English</option>
                        <option value="tr" key="tr" selected={i18n.language === 'tr'}  >Turkish (Türkçe)</option>
                    </select>
                </div>
                <div className="col-5 offset-3">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="about-link-container" onClick={e => window.electron.openInBrowser('https://www.buymeacoffee.com/sschrs')}>
                                <Link className="about-link"><SiBuymeacoffee /></Link>
                                <div>buy me a coffee</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="about-link-container" onClick={e => window.electron.openInBrowser('https://github.com/sschrs/minemosin')}>
                                <div className="about-link"><BsGithub /></div>
                                <div>GitHub Page</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="about-link-container">
                                <div className="about-link" ><BiWorld /></div>
                                <div>minemosin.io</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <p>Hello! <br />
                Minemosin is a key-value based, completely free and open source learning tool.
                I hope you had fun and learned a lot. If you enjoyed minemosin,
                you can <b style={{ cursor: 'pointer' }} onClick={e => window.electron.openInBrowser('https://www.buymeacoffee.com/sschrs')}>buy me a coffee</b> to support me. Thus, you can increase my motivation in this job and help me develop more quality projects.
                <br />Thanks!
            </p>



        </div>

    )
}

export default SettingsPage;