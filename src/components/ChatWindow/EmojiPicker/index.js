import React from 'react';
import EmojiConvertor from 'emoji-js';
import emojiData from './emojiData.json';
import styles from './index.less';

const emojiConvertor = new EmojiConvertor();
emojiConvertor.init_env();

const EmojiPicker = ({ onEmojiPicked, filter }) => (
  <div className={styles['sc-emoji-picker']}>
    {emojiData.map(category => {
      const filteredEmojis = category.emojis.filter(({ name }) => name.includes(filter));
      return (
        <div className={styles['sc-emoji-picker--category']} key={category.name}>
          {filteredEmojis.length > 0 && (
            <div className={styles['sc-emoji-picker--category-title']}>{category.name}</div>
          )}
          {filteredEmojis.map(({ char, _name }) => {
            // eslint-disable-next-line no-console
            console.log(_name);
            return (
              <span
                key={char}
                className={styles['sc-emoji-picker--emoji']}
                onClick={() => onEmojiPicked(char)}
              >
                {char}
              </span>
            );
          })}
        </div>
      );
    })}
  </div>
);

export default EmojiPicker;
