# closevector-react

This React hook provides an easy integration with the `CloseVectorManager` from the `closevector-web` package.

## Installation

```bash
npm install closevector-react
```

## Usage

```jsx
import { useCloseVectorManager } from 'closevector-react';

function MyComponent() {
    const { manager, downloadProgress, getInstance } = useCloseVectorManager({
        accessKey: 'YOUR_ACCESS_KEY',
        uuid: 'YOUR_UUID',
        customEmbeddings: 'YOUR_CUSTOM_EMBEDDINGS'
    });

    // Use the manager, downloadProgress, and getInstance as needed
}
```

## API

### `useCloseVectorManager(options)`

The `useCloseVectorManager` hook initializes and manages the instance of `CloseVectorManager`.

#### Parameters

- `options`: An object containing the following properties:
  - `accessKey`: Your access key for CloseVectorManager.
  - `uuid`: Your unique identifier for the instance.
  - `customEmbeddings`: Your custom embeddings (if any).

#### Returns

- `manager`: The instance of `CloseVectorManager`.
- `downloadProgress`: A number representing the download progress (ranging from 0 to 1).
- `getInstance`: A function to retrieve the library instance of the manager. Throws an error if the manager is not initialized.

## License

[MIT](LICENSE)
