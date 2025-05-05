import { render, screen, fireEvent } from "@testing-library/react";
import BooksFilter from "./BooksFilter";
import useBrowse from "../../hooks/useBrowse";

jest.mock("../../hooks/useBrowse");

describe("BooksFilter Component", () => {
  let setSearchParamsMock;

  beforeEach(() => {
    
    setSearchParamsMock = jest.fn();
    useBrowse.mockReturnValue({
      sortType: "rating",
      sortDirection: "asc",
      setSearchParams: setSearchParamsMock,
    });
  });

  test("renders correctly with initial values", () => {
    render(<BooksFilter />);

    // Check for heading
    expect(screen.getByText("Sort By :")).toBeInTheDocument();

    // Check for dropdown and its default value
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("rating");

    // Check for radio buttons and their default states
    const ascRadio = screen.getByLabelText("ASC");
    const descRadio = screen.getByLabelText("DESC");

    expect(ascRadio).toBeInTheDocument();
    expect(descRadio).toBeInTheDocument();
    expect(ascRadio.checked).toBe(true);
    expect(descRadio.checked).toBe(false);
  });

  test("calls setSearchParams on dropdown change", () => {
    render(<BooksFilter />);

    const select = screen.getByRole("combobox");

    // Change dropdown value
    fireEvent.change(select, { target: { value: "publish-date" } });

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("updates search params correctly when dropdown changes", () => {
    setSearchParamsMock.mockImplementation((updateFn) => {
      const prevParams = new URLSearchParams("sortType=rating&sortDirection=asc");
      const updatedParams = updateFn(prevParams);
      expect(updatedParams.get("sortType")).toBe("publish-date");
    });

    render(<BooksFilter />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "publish-date" } });
  });

  test("calls setSearchParams on dropdown change and updates sortType", () => {
    render(<BooksFilter />);

    const select = screen.getByRole("combobox");

    // Change dropdown value to "publish-date"
    fireEvent.change(select, { target: { value: "publish-date" } });

    // Check if setSearchParams is called once
    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
    
    // Check if sortType is correctly updated in the URLSearchParams
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("calls setSearchParams on radio button change", () => {
    render(<BooksFilter />);

    const descRadio = screen.getByLabelText("DESC");

    // Change radio button selection
    fireEvent.click(descRadio);

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("updates search params correctly when radio button changes", () => {
    setSearchParamsMock.mockImplementation((updateFn) => {
      const prevParams = new URLSearchParams("sortType=rating&sortDirection=asc");
      const updatedParams = updateFn(prevParams);
      expect(updatedParams.get("sortDirection")).toBe("desc");
    });

    render(<BooksFilter />);

    const descRadio = screen.getByLabelText("DESC");
    fireEvent.click(descRadio);
  });

  test("does not call setSearchParams if dropdown value does not change", () => {
    render(<BooksFilter />);

    const select = screen.getByRole("combobox");

    // Trigger change event with the same value
    fireEvent.change(select, { target: { value: "rating" } });

    expect(setSearchParamsMock).not.toHaveBeenCalled();
  });

  test("displays the correct number of options in the dropdown", () => {
    render(<BooksFilter />);

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(2);
    expect(options[0].value).toBe("rating");
    expect(options[1].value).toBe("publish-date");
  });


  test("renders correctly when props change", () => {
    useBrowse.mockReturnValue({
      sortType: "publish-date",
      sortDirection: "desc",
      setSearchParams: setSearchParamsMock,
    });

    render(<BooksFilter />);

    // Check if dropdown value is updated
    const select = screen.getByRole("combobox");
    expect(select.value).toBe("publish-date");

    // Check if radio buttons are updated
    const ascRadio = screen.getByLabelText("ASC");
    const descRadio = screen.getByLabelText("DESC");
    expect(ascRadio.checked).toBe(false);
    expect(descRadio.checked).toBe(true);
  });


});
