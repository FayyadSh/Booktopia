<h1 style="color: #7a6930; border-radius: 5px; margin-bottom: 30px;"> Booktopia 📚 </h1>

A modern and user-friendly platform where users can explore and discover books. This app allows users to browse **<span style="color: #f3f2ec;">top-rated</span>**, **<span style="color: #f3f2ec;">popular</span>**, and **<span style="color: #f3f2ec;">best-selling</span>** books, search for books, and manage their favorite list. All UI components, including **<span style="color: #f3f2ec;">modals</span>**, **<span style="color: #f3f2ec;">sliders</span>**, **<span style="color: #f3f2ec;">filter bars</span>**, and **<span style="color: #f3f2ec;">theme switching</span>**, were implemented manually. The app is thoroughly tested using **<span style="color: #f3f2ec;">React Testing Library</span>**.

---

## Features ✨

1. **Browse Books**:
   - Explore **<span style="color: #f3f2ec;">top-rated</span>**, **<span style="color: #f3f2ec;">popular</span>**, and **<span style="color: #f3f2ec;">best-selling</span>** books displayed in sliders. 🎡
   - Browse **<span style="color: #f3f2ec;">new books</span>** with a clean and responsive UI. 📚

2. **Search Books**:
   - Search for books by **<span style="color: #f3f2ec;">title</span>**, **<span style="color: #f3f2ec;">category</span>**, or **<span style="color: #f3f2ec;">author name</span>**. 🔍
   - Results are displayed in a **<span style="color: #f3f2ec;">pagination</span>** component for easy navigation.

3. **Filter and Sort**:
   - Filter results by **<span style="color: #f3f2ec;">publish date</span>** or **<span style="color: #f3f2ec;">rating</span>**. 🗓️⭐
   - Sort results in **<span style="color: #f3f2ec;">ascending</span>** or **<span style="color: #f3f2ec;">descending</span>** order using the filter bar. 🔄

4. **Book Details**:
   - Click on a book to view its details in a **<span style="color: #f3f2ec;">modal</span>**. 📖
   - The modal also displays **<span style="color: #f3f2ec;">similar books</span>** in a slider. 🎡

5. **Favorite List**:
   - Users can add books to their **<span style="color: #f3f2ec;">favorite list</span>**, which is stored in **<span style="color: #f3f2ec;">local storage</span>**. ❤️

6. **Theme Switching**:
   - Users can switch between **<span style="color: #f3f2ec;">light</span>** and **<span style="color: #f3f2ec;">dark</span>** themes. 🌞🌙

7. **Custom UI Components**:
   - All UI components, including **<span style="color: #f3f2ec;">modals</span>**, **<span style="color: #f3f2ec;">sliders</span>**, **<span style="color: #f3f2ec;">filter bars</span>**, and **<span style="color: #f3f2ec;">theme switching</span>**, were implemented manually. 🛠️

8. **Testing**:
   - The app is thoroughly tested using **<span style="color: #f3f2ec;">React Testing Library</span>** for reliable functionality. 🧪

---

## Tech Stack 🛠️

- **Frontend**: **<span style="color: #f3f2ec;">React</span>**, **<span style="color: #f3f2ec;">CSS</span>**
- **State Management**: **<span style="color: #f3f2ec;">Context API</span>**
- **UI Components**: Custom-built **<span style="color: #f3f2ec;">modals</span>**, **<span style="color: #f3f2ec;">sliders</span>**, **<span style="color: #f3f2ec;">filter bars</span>**, and **<span style="color: #f3f2ec;">theme switching</span>**
- **Testing**: **<span style="color: #f3f2ec;">React Testing Library</span>**
---

## Key Implementation Details 🔧

### 1. **Custom UI Components** 🛠️
- **Modals**: Built from scratch to display book details and similar books.
- **Sliders**: Implemented manually for displaying top-rated, popular, and best-selling books.
- **Filter and Sort Bars**: Custom components for filtering and sorting book results.
- **Theme Switching**: A toggle button to switch between light and dark themes.

### 2. **Favorite List** ❤️
- Users can add books to their favorite list, which is stored in **<span style="color: #f3f2ec;">local storage</span>** for persistence.

### 3. **Theme Management** 🌞🌙
- Users can toggle between **<span style="color: #f3f2ec;">light</span>** and **<span style="color: #f3f2ec;">dark</span>** themes.

### 4. **Testing** 🧪
- Comprehensive testing with **<span style="color: #f3f2ec;">React Testing Library</span>** for reliable functionality.

---

## Running the Project 🏃‍♂️

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install