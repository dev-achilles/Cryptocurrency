import React from 'react';
import s from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={s.footer_container}>
      <div className={s.footer_row}>
        <div className={s.footer_content}>
          <div className={s.footer_title}>Name Company</div>
          <div className={s.footer_description}>
            ICO Drops is an independent ICO (Token Sale) database and is not affiliated with any ICO
            project or company. Our Interest Level does not constitute financial or investment
            advice.
          </div>
          <div className={s.footer_copyright}>© 2021 ICO Drops.</div>
        </div>
        <div className={s.footer_columnInfo}>
          <a href="#">Active ICO</a>
          <a href="#">Upcoming ICO</a>
          <a href="#">Ended ICO</a>
          <a href="#">Bounty List</a>
          <a href="#">SandBox </a>
        </div>
        <div className={s.footer_companyInfo}>
          <a href="#">Dropstab</a>
          <a href="#">Dropsearn</a>
          <a href="#">Portfolio</a>
          <a href="#">Ico calendar</a>
        </div>
        <div className={s.footer_mediaLink}>
          <a href="#">Email</a>
          <a href="#">Twitter</a>
          <a href="#">Telegram</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
