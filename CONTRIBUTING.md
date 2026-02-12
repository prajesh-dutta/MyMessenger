# Contributing to MyMessenger

Thank you for considering contributing to MyMessenger! We welcome contributions from everyone.

## 🌟 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

We love new ideas! Please create an issue with:
- A clear description of the feature
- Why it would be useful
- How it might work

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/MyMessenger.git
   cd MyMessenger
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Remove:` for removing code/files
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes clearly

## 📝 Code Style Guidelines

### JavaScript/React

- Use ES6+ features
- Use functional components and hooks
- Keep components small and focused
- Use meaningful variable names
- Add PropTypes or TypeScript for type checking

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Ensure responsive design
- Test on multiple screen sizes

### Backend

- Follow RESTful API conventions
- Add error handling
- Validate user input
- Document API endpoints

## 🧪 Testing

Before submitting a PR:

1. **Test locally**
   ```bash
   npm run server  # Terminal 1
   npm run client  # Terminal 2
   ```

2. **Check for errors**
   - Open browser console (F12)
   - Check backend logs
   - Test all modified features

3. **Test edge cases**
   - Empty inputs
   - Invalid data
   - Network errors
   - Different browsers

## 🔒 Security

- Never commit sensitive data (.env files, keys, passwords)
- Validate all user input
- Use parameterized queries
- Keep dependencies updated
- Report security issues privately

## 📚 Documentation

When adding features:
- Update README.md if needed
- Add inline code comments
- Update API documentation
- Add examples for complex features

## 💡 Development Tips

### Local Development

```bash
# Install dependencies
npm run install-all

# Start MongoDB (if using local)
mongod

# Start development servers
npm run server  # Backend on port 8000
npm run client  # Frontend on port 5173
```

### Debugging

- Use `console.log()` for quick debugging
- Use browser DevTools for frontend issues
- Check Network tab for API issues
- Use MongoDB Compass to inspect database

### Common Issues

**Port already in use:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**MongoDB connection error:**
- Ensure MongoDB is running
- Check MONGO_URI in .env

**Dependencies issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎨 UI/UX Guidelines

- Maintain consistent styling
- Use the existing color palette
- Ensure accessibility (WCAG 2.1)
- Test on mobile devices
- Keep animations smooth (60fps)

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows the project style
- [ ] All tests pass locally
- [ ] No console errors or warnings
- [ ] Documentation updated (if needed)
- [ ] Commits are clear and descriptive
- [ ] PR description explains changes
- [ ] Screenshots added (for UI changes)
- [ ] Security considerations reviewed

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## 📞 Need Help?

- Check existing issues and discussions
- Read the documentation (README.md, SETUP.md)
- Ask questions in GitHub Discussions
- Contact maintainers via GitHub

## 🙏 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Appreciated in the community

Thank you for contributing to MyMessenger! 🎉
