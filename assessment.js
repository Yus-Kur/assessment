//厳格モード、宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述
'use strict';

// 17 から追加
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/*assessmentButton.onclick = function() {
    console.log('ボタンが押されました');
  };*/

//入力欄に入力された文字を表示する
assessmentButton.onclick = () => {
    const userName = userNameInput.value;


    //入力欄に何も入力されなかった場合は、何の処理も行わない
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    //console.log(userName);


    // 診断結果表示エリアの作成

    //診断ボタンが押されたら一度、診断結果の div 要素の子どもの要素を全て削除する処理
    resultDivided.innerText = '';

    //ツイートの削除
    tweetDivided.innerText = '';

    // html における h3
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);


    // TODO ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    //const hrefValue ='https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';

    //ハッシュタグ
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' + 
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    //anchor.setAttribute('data-text', '診断結果の文章');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    // widgets.js スクリプトを設定し実行するコード
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

// Enterキー を押す
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};


//const で宣言された変数は、一度代入すると再代入できない
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。', '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果 
 */

function assessment(userName) {

    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;

    //名前の文字全ての文字のコードを足し合わせる
    //userName.length は文字列の長さを取得
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    /*名前から計算した文字のコード番号の合計値を、診断結果のパターンの数で割った余りを求め、
      それを利用して配列から診断結果を取得*/
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    // {userName}に名前が入る
    result = result.replaceAll('{userName}', userName);

    // TODO {userName} をユーザの名前に置き換える
    return result;
}

console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

// 失敗するテストコード
console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

//「入力が同じ名前なら、同じ診断結果を出力する」処理が正しいかのテスト
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
