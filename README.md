<img src="/public/Exauge.png" class="logo" width="120"/>

# Exauge

## Introduction

**Exauge** is an AI-powered tool designed for content-driven online businesses—such as blogs, publications, and news sites—to boost interactivity and engagement. With Exauge, you can easily add a short quiz after each article on your website. This not only encourages your readers to spend more time on your site but also helps you gauge the complexity of your content and how well your audience understands it. Make your content more interactive and insightful with Exauge!

---

## Installation

Get started with Exauge in just a few steps:

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd exauge

# 2. Install dependencies
pnpm i

# 3. Build the project
pnpm build

# 4. Start the application
pnpm start
```

---

## Database

Exauge uses **Prisma Client** with a **PostgreSQL** database.
Before running the application, make sure to set the `DATABASE_URL` environment variable with your PostgreSQL connection string.

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

---

## API Key \& API Secret

To use Exauge, you need to register your client project and obtain API credentials:

1. **Register** your first client project.
2. **Login** using your credentials.
3. Go to **Settings** and copy your **API Key** and **API Secret**.

---

## Install Widget on Your Client Website

Add the Exauge Quiz Widget to your article pages:

1. Install the widget in your client project:

```bash
npm i exauge-widget
```

2. Place the component below your article content, where you bootstrap your articles.
Provide the required attributes:

```jsx
<QuizWidget
  position="bottom-right"
  userId={3}
  htmlId={slug} // URL or unique identifier for the article (e.g., router.pathName)
  apiKey="XXXX"
  apiSecret="XXXX"
/>
```

3. When you run your client application, a **Q** button will appear at the bottom.
Clicking it will automatically generate a quiz for your users based on the article content.

---

## Features

- **AI-powered quiz generation** for any article.
- **Easy integration** with just a few lines of code.
- **Audience insights**: See how well users understand your content.
- **Boost engagement** and increase time spent on your site.

---

## Contributors

Thanks to the amazing contributors who have helped build Exauge:

- [Saad Hasnain Khan](https://github.com/hasnainsaad93)
- [Muhammad Fahad](https://github.com/Mfahad11)
- [Maaz Hasnain Khan](https://github.com/maazhasnainkhan)

---

## License

[MIT](LICENSE)

---

**Exauge** — Make your content interactive, insightful, and engaging! 🚀

