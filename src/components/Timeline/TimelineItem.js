import * as React from 'react';
import { view } from 'react-easy-state';
import classNames from 'classnames';
import ReactHtmlParser from 'react-html-parser';

import * as css from './TimelineItem.scss';

import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export default view(({item}) => {

    if (item == null) {
        item = {
            name : 'Random name',
            date : new Date(),
            event_type : 'github',
            source : 'https://google.com',
            content : 'Hello world!',
            };
    }

    const time = dayjs(item.date).utc().format('DD MMMM YYYY, HH:mm:ssZ[Z]');
    let icon = '';

    switch(item.event_type){
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
        <div className='container pb-3'>
            <SourceNav source={item.source} event={item.event_type} />
            <div className='card'>
                <div className='card-content'>
                    <div className='media'>
                        <div className='media-left'>
                        <a href={item.source}><span className='title icon'><i className={icon}></i></span></a>
                        </div>
                        <div className='media-content'>
                            <p className='title is-4'>{item.name}</p>
                            <p className='subtitle is-6'>on&nbsp;<time datetime={item.date}>{time}</time></p>
                        </div>
                        <div className='media-right is-hidden'>
                            <a href="#"><span className='icon'><i className='far fa-sticky-note' aria-hidden="true"></i></span></a>
                        </div>
                    </div>
                    <div className='content'>
                        <figure className='container has-text-left mx-0'>
                        <ExpandNav event={item.event_type}/>
                            <div className={classNames(css.previewItem, 'has-background-light')}>
                                {ReactHtmlParser(item.content)}
                            </div>
                        </figure>
                    </div>
                </div>
                <CardFooter  />       
            </div>
        </div>

    )
  });

  const CardFooter = ({id}) => {
    return(
        <footer className='card-footer is-hidden'>
        <a href="#" className='card-footer-item'>1</a>
        <a href="#" className='card-footer-item'>2</a>
        <a href="#" className='card-footer-item'>3</a>
        <a href="#" className='card-footer-item'>4</a>
        </footer>
    );
  };

  const ExpandNav = ({id, source, event}) => {
    return(
        <nav className='level is-mobile'>
            <div className='level-left'>
            <div className='levelItem has-text-centered'>
                        <div>
                        <p className='tags are-normal'>
                                <span className='tag is-info is-light'>{event}</span>&nbsp;
                            </p>
                        </div>
                </div>
            </div>
            <div className='level-right'>
            <div className='level-item  has-text-centered'>
                        <div>
                        </div>
                </div>
            </div>
        </nav>
    );
  };

  const SourceNav = ({id, source, event}) => {
    return(
        <nav className='level is-mobile mb-1'>
            <div className='level-left'>
            
            </div>
            <div className='level-right'>
                <div className='level-item has-text-centered'>
                        <div>
    <span className={css.buttonSourceNav}>Source:&nbsp;<a href={source} target='_blank'>{event}</a></span>
                        </div>
                </div>
            </div>
        </nav>
    );
  };

  const ShowTags = ({tags}) => {
        return(
            <nav className='level'>
                <div className='level-left'>
                    <div className='level-item has-text-left'>
                        <div>
                            <p className='tags are-normal'>
                                <span className='tags is-black'>Tag 1</span>&nbsp;
                                <span className='tags is-dark'>Tag 2</span>&nbsp;
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        );
  };


