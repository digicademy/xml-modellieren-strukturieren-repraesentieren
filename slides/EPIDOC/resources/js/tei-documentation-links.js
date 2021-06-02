// @see https://github.com/hou2zi0/tei-doc-link
if (typeof TEI_DOC_LINK === 'undefined') TEI_DOC_LINK = `xml tei-doc-link`;


const codeList = document.getElementsByClassName(TEI_DOC_LINK);
//console.log(codeList);
//console.log(codeList[0].textContent);

Array.from(codeList)
  .forEach((n) => {
    const text = n.textContent.replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // ELEMENT NAMES
    const regexEl = `&lt;(\/{0,1})([-A-Za-z:]*?)(\\s.*?.*?){0,1}(\/{0,1})&gt;`;
    const regularExpressionEl = new RegExp(regexEl, 'g');
    const newSnippetEl = text.replace(regularExpressionEl, "<span class='delimiters'>&lt;$1</span><span class='element'><a class='tei-doc-link' href='http://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-$2.html'>$2</a>$3</span><span class='delimiters'>$4&gt;</span>");

    // ATTRIBUTES & VALUES
    const regexAttr = `([-A-Za-z:]*?)="(.*?)"`;
    const regularExpressionAttr = new RegExp(regexAttr, 'g');

    // Replace function for RegEx maps attribute names to respective TEI documentation pages
    function replacer(match, p1, p2) {
      const tei_attributes = {
        "type": "att.typed",
        "subtype": "att.typed",
        "xml:id": "att.global",
        "xml:lang": "att.global",
        "n": "att.global",
        "key": "att.canonical",
        "ref": "att.canonical",
        "rend": "att.global.rendition",
        "style": "att.global.rendition",
        "rendition": "att.global.rendition",
        "resp": "att.global.responsibility",
        "cert": "att.global.responsibility",
        "lemma": "att.linguistic",
        "lemmaRef": "att.linguistic",
        "role": "att.naming",
        "nymRef": "att.naming",
        "sex": "person",
        "age": "person",
        "unit": "att.dimensions",
        "quantity": "att.dimensions",
        "extent": "att.dimensions",
        "precision": "att.dimensions",
        "scope": "att.dimensions",
        "atLeast": "att.ranging",
        "atLeast": "att.ranging",
        "atMost": "att.ranging",
        "min": "att.ranging",
        "max": "att.ranging",
        "confidence": "att.ranging",
        "hand": "att.written",
        "place": "att.placement",
        "scribe": "att.handFeatures",
        "scribeRef": "att.handFeatures",
        "script": "att.handFeatures",
        "scriptRef": "att.handFeatures",
        "medium": "att.handFeatures",
        "scope": "att.handFeatures",
        "reason": "gap",
        "agent": "gap",
        "corresp": "att.global.linking",
        "synch": "att.global.linking",
        "sameAs": "att.global.linking",
        "copyOf": "att.global.linking",
        "next": "att.global.linking",
        "prev": "att.global.linking",
        "exclude": "att.global.linking",
        "select": "att.global.linking",
        "when": "att.datable.w3c",
        "notBefore": "att.datable.w3c",
        "notAfter": "att.datable.w3c",
        "from": "att.datable.w3c",
        "to": "att.datable.w3c",
        "when-iso": "att.datable.iso",
        "notBefore-iso": "att.datable.iso",
        "notAfter-iso": "att.datable.iso",
        "from-iso": "att.datable.iso",
        "to-iso": "att.datable.iso",
        "when-custom": "att.datable.custom",
        "notBefore-custom": "att.datable.custom",
        "notAfter-custom": "att.datable.custom",
        "from-custom": "att.datable.custom",
        "to-custom": "att.datable.custom",
        "datingPoint": "att.datable.custom",
        "datingMethod": "att.datable.custom",
        "dur": "att.duration.w3c",
        "dur-iso": "att.duration.iso",
        "break": "att.breaking",
        "calendar": "att.datable",
        "period": "att.datable",
        "status": "att.transcriptional",
        "cause": "att.transcriptional",
        "seq": "att.transcriptional",
        "who": "att.ascribed",
        "ana": "att.global.analytic",
        "facs": "att.global.facs",
        "met": "att.metrical",
        "real": "att.metrical",
        "rhyme": "att.metrical",
        "value": "num",
        "locus": "certainty",
        "assertedValue": "certainty",
        "given": "certainty",
        "degree": "certainty",
      };
      let attribute = p1;
      if (attribute in tei_attributes) {
        attribute = `<a class='tei-doc-link' href='http://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-${tei_attributes[attribute]}.html#tei_att.${attribute.replace(':','-')}'>${attribute}</a>`
      }
      const value = p2;
      const regstr = `<span class="attribute">${attribute}</span><span class="delimiters">=</span><span class="value">"${value}"</span>`;
      return regstr;
    }
    const newSnippetAttr = newSnippetEl.replace(regularExpressionAttr, replacer)

    // COMMENT STRINGS
    const regexCommStr = `(&lt;\!)(.*?)(&gt;)`;
    const regularExpressionCommStr = new RegExp(regexCommStr, 'g');
    const newSnippetCommStr = newSnippetAttr.replace(regularExpressionCommStr, '<span class="comment-string">$1$2$3</span>')

    n.innerHTML = newSnippetCommStr;
  });