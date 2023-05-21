import React, { FC } from "react";
import styles from "./searchInput.module.scss";

type props = {
  value: string;
  onChange: (str: string) => void;
};

const SearchInput: FC<props> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        className={`form-control me-2 ${styles.input}`}
        type="search"
        placeholder="Digite o nome do anime..."
        aria-label="Search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
