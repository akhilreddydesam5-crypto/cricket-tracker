module.exports = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var u = (req.query && req.query.url) || '';
  if (!/^https:\/\/(www\.)?cricclubs\.com\//i.test(u)) {
    res.status(400).json({ error: 'Only cricclubs.com links allowed' });
    return;
  }
  try {
    var r = await fetch(u, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml'
      },
      redirect: 'follow'
    });
    var t = await r.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=600');
    res.status(200).send(t);
  } catch (e) {
    res.status(502).json({ error: 'fetch failed' });
  }
};
