const setHeadAssetsFunctionality = (res) => {
    res.locals.styles = [];
    res.locals.scripts = [];
    res.addStyle = (css, priority = 0) => {
        res.locals.styles.push({ content: css, priority });
    };
    res.addScript = (js, priority = 0) => {
        res.locals.scripts.push({ content: js, priority });
    };
    // These functions will be available in EJS templates
    res.locals.renderStyles = () => {
        return res.locals.styles
            // Sort by priority: higher numbers load first
            .sort((a, b) => b.priority - a.priority)
            .map(item => item.content)
            .join('\n');
    };
    res.locals.renderScripts = () => {
        return res.locals.scripts
            // Sort by priority: higher numbers load first
            .sort((a, b) => b.priority - a.priority)
            .map(item => item.content)
            .join('\n');
    };
};

export const addLocalVariables = (req, res, next) => {
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
  res.locals.queryParams = req.query || {};
  setHeadAssetsFunctionality(res);

  // Convenience variables for UI state based on session state
  res.locals.isLoggedIn = false;
  res.locals.isAdmin = false;
  if (req.session && req.session.user) {
    res.locals.isLoggedIn = true;
    if (req.session.user.role == 'admin') {
      res.locals.isAdmin = true;
    }
    
  }
  console.log(req.session)

  next();
}