import * as React from 'react'
import { view } from 'react-easy-state'
import classNames from 'classnames'
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
moment().format('lll');

import * as css from './TimelineItem.scss'

export default view(({event}) => {

    if (event == null) {
        event = {
            name : 'Random name',
            date : new Date(),
            event_type : 'github',
            source : 'https://google.com',
            content : 'Hello world!'
            }
    }

    const time = moment(event.date).format('MMMM Do YYYY, h:mm:ss a');
    let icon = '';


    switch(event.event_type){
        case 'GitHub open issue':
        icon = 'fab fa-github';
        break;
        case 'Telegram chat':
        icon = 'fab fa-telegram';
        break;
        case 'Mozilla Blog':
        icon = 'fas fa-globe';
        break;
        case 'Discourse':
        icon = 'fab fa-discourse';
        break;
        case 'Google Docs':
        icon = 'fab fa-google-drive';
        break;
        case 'Vydio conference + etherpad':
        icon = 'fas fa-broadcast-tower';
        break;
        default:
        icon = 'fas fa-cube';
    }

    return (
        <div className={css.container, css['mb-5']}>
            <SourceNav source={event.source} event={event.event_type} />
            <div className={classNames(css.card)}>
                <div className={css.cardContent}>
                    <div className={css.media}>
                        <div className={css.mediaLeft}>
                        <a href={event.source}><span className={classNames(css.title, css.icon)}><i className={classNames(icon)}></i></span></a>
                        </div>
                        <div className={css.mediaContent}>
                            <p className={classNames(css.title, css['is-4'], css['mb-5'])}>{event.name}</p>
                            <p className={classNames(css.subtitle, css['is-6'], css['mb-2'])}>on&nbsp;<time datetime={event.date}>{time}</time></p>
                        </div>
                        <div className={classNames(css.mediaRight, css.isHidden)}>
                            <a href="#"><span className={classNames(css.icon)}><i className='far fa-sticky-note' aria-hidden="true"></i></span></a>
                        </div>
                    </div>
                    <div className={css.content}>
                        <figure className={classNames(css.container, css.hasTextJustified, css['is-6'])}>
                        <ExpandNav event={event.event_type}/>
                            <div className={classNames(css.previewItem)}>
                                {ReactHtmlParser(event.content)}
                            </div>
                            
                        </figure>
                    </div>
                </div>
                <CardFooter  />       
            </div>
        </div>

    )
  })

  const CardFooter = ({id}) => {
    return(
        <footer className={css.cardFooter, css.isHidden}>
        <a href="#" className={css.cardFooterItem}>1</a>
        <a href="#" className={css.cardFooterItem}>2</a>
        <a href="#" className={css.cardFooterItem}>3</a>
        <a href="#" className={css.cardFooterItem}>4</a>
        </footer>
    );
  };

  const ExpandNav = ({id, source, event}) => {
    return(
        <nav className={classNames(css.level, css.isMobile)}>
            <div className={css.levelLeft}>
            <div className={classNames(css.levelItem, css.hasTextCentered)}>
                        <div>
                        <p claclassNamess={classNames(css.tags, css.areNormal)}>
                                <span className={classNames(css.tag, css.isBlack)}>{event}</span>&nbsp;
                            </p>
                        </div>
                </div>
            </div>
            <div className={css.levelRight}>
            <div className={classNames(css.levelItem, css.hasTextCentered)}>
                        <div>
                        </div>
                </div>
            </div>
        </nav>
    );
  };

  const SourceNav = ({id, source, event}) => {
    return(
        <nav className={classNames(css.level, css.isMobile)}>
            <div className={css.levelLeft}>
            
            </div>
            <div className={css.levelRight}>
                <div className={classNames(css.levelItem, css.hasTextCentered)}>
                        <div>
    <span className={classNames(css.buttonSourceNav)}>Source:&nbsp;<a href={source} target='_blank'>{source}</a></span>
                        </div>
                </div>
            </div>
        </nav>
    );
  };

  const ShowTags = ({tags}) => {
        return(
            <nav className={classNames(css.level,)}>
                <div className={css.levelLeft}>
                    <div className={classNames(css.levelItem, css.hasTextLeft)}>
                        <div>
                            <p claclassNamess={classNames(css.tags, css.areNormal)}>
                                <span className={classNames(css.tag, css.isBlack)}>Tag 1</span>&nbsp;
                                <span className={classNames(css.tag, css.isDark)}>Tag 2</span>&nbsp;
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        );
  };


