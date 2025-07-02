import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

function ShareButtons({url, title}) {
  console.log("url: ", url);
  console.log("title: ", title);
  return (
    <div className="share-buttons-container">
      <EmailShareButton url={url} quote={title} className="share-buttons">
        <EmailIcon borderRadius={20} />
      </EmailShareButton>

      <FacebookShareButton url={url} quote={title} className="share-buttons">
        <FacebookIcon borderRadius={20} />
      </FacebookShareButton>

      <LinkedinShareButton url={url} quote={title} className="share-buttons">
        <LinkedinIcon borderRadius={20} />
      </LinkedinShareButton>

      <RedditShareButton url={url} quote={title} className="share-buttons">
        <RedditIcon borderRadius={20} />
      </RedditShareButton>

      <TelegramShareButton url={url} quote={title} className="share-buttons">
        <TelegramIcon borderRadius={20} />
      </TelegramShareButton>

      <WhatsappShareButton url={url} quote={title} className="share-buttons">
        <WhatsappIcon borderRadius={20} />
      </WhatsappShareButton>
    </div>
  );
}

export default ShareButtons;
