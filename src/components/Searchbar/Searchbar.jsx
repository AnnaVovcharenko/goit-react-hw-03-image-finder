import { Component } from 'react';
import {SearchForm, SearchInput, SearchButton, SearchSpan,} from "./Searchbar.styled";

export class SearchBar extends Component {
  state = {
    //searchValue: '',
    searchName: '', // Хранит значение введенного поискового запроса
    inputValue: '',
  };

  // handleChange = event => {
  //   this.setState({ searchValue: event.target.value });
  // };
  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };
  // handleSubmit = event => {
  //   event.preventDefault(); // Запобігаємо стандартній поведінці форми
  //   if (!this.state.searchValue.trim()) {
  //     return;
  //   }
  //   this.props.onSubmit(this.state.searchValue); // Передаємо введений пошуковий запит батьківському компоненту
  // };
  handleSubmit = event => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    const searchQuery = event.target.elements.searchName.value.trim(); // Получаем введенный поисковый запрос и удаляем пробелы
    this.props.onSubmit(searchQuery); // Передаем введенный поисковый запрос родительскому компоненту
    event.target.reset(); // Сбрасываем значение в поле ввода после отправки формы
  };
  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchSpan>Search</SearchSpan>
          </SearchButton>

          <SearchInput
            //name="search"
            name="searchName"
            id="search"
            autoComplete="off"
            autoFocus
            type="text"
            placeholder="Search images and photos"
            //value={this.state.searchValue}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}
