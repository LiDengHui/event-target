
# @dhlx/event-target

A lightweight implementation of an event-driven architecture in TypeScript, inspired by the DOM `EventTarget`. This project provides a basic structure to simulate event bubbling, event listeners, and propagation control in a custom event system.

## Features

- **Event Bubbling**: Events triggered on child targets bubble up to their parent targets, similar to the DOM's event model.
- **Event Listeners**: Add and remove listeners for specific event types.
- **Propagation Control**: Stop event propagation at any level using `event.stopPropagation()`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Testing](#testing)
- [License](#license)

## Installation

You can clone this repository and install its dependencies by running:

```bash
npm install @dhlx/event-target
```

## Usage

### Example: Basic Event Bubbling

Here’s an example of how you can create an event bubbling system using the `EventTarget` class.

```typescript
import { EventTarget, Event } from '@dhlx/event-target';

// Create instances
const grandparent = new EventTarget('grandparent');
const parent = new EventTarget('parent');
const child = new EventTarget('child');

// Set up parent-child relationships
parent.setParent(grandparent);
child.setParent(parent);

// Add event listeners
grandparent.addEventListener('click', () => {
    console.log('Grandparent received event');
});

parent.addEventListener('click', () => {
    console.log('Parent received event');
});

child.addEventListener('click', () => {
    console.log('Child received event');
});

// Dispatch event from child
const clickEvent = new Event('click');
child.dispatchEvent(clickEvent);

// Expected Output:
// Child received event
// Parent received event
// Grandparent received event
```

### Example: Stopping Event Propagation

You can stop the event from propagating further up the hierarchy by using `event.stopPropagation()`.

```typescript
parent.addEventListener('click', (event: Event) => {
    console.log('Parent received event');
    event.stopPropagation();  // Stops the event from reaching grandparent
});

child.dispatchEvent(new Event('click'));

// Expected Output:
// Child received event
// Parent received event
```

## API

### `EventTarget`

#### `new EventTarget(name: string)`

Creates a new `EventTarget` instance.

- **name**: A string that gives the instance a name (for reference in event handling).

#### `addEventListener(type: string, listener: (event: Event) => void): void`

Registers an event listener for a specific event type.

- **type**: A string representing the type of the event (e.g., `'click'`).
- **listener**: The function to execute when the event is triggered.

#### `removeEventListener(type: string, listener: (event: Event) => void): void`

Removes a previously registered event listener.

- **type**: The event type from which the listener should be removed.
- **listener**: The function to remove.

#### `dispatchEvent(event: Event): void`

Dispatches an event, triggering the event listeners and starting the event propagation process.

- **event**: An instance of the `Event` class representing the event to be dispatched.

#### `setParent(parent: EventTarget): void`

Sets a parent `EventTarget` for the current target, creating a hierarchy for event bubbling.

### `Event`

#### `new Event(type: string)`

Creates a new `Event` instance.

- **type**: The type of the event (e.g., `'click'`).

#### `stopPropagation(): void`

Stops the event from propagating to parent targets.

## Testing

This project uses [AVA](https://github.com/avajs/ava) for testing. To run the tests, first install the necessary dependencies:

```bash
npm install
```

Then run the tests using the following command:

```bash
npx ava
```

### Example Test

The `EventTarget` class is tested to ensure correct behavior, including event bubbling, stopping propagation, and event listener registration/removal.

Here’s an example of a test:

```typescript
import test from 'ava';
import EventTarget, { Event } from './eventtarget';

test('Event should bubble up from child to parent', t => {
    const grandparent = new EventTarget('grandparent');
    const parent = new EventTarget('parent');
    const child = new EventTarget('child');

    parent.setParent(grandparent);
    child.setParent(parent);

    let grandparentCalled = false;
    let parentCalled = false;
    let childCalled = false;

    grandparent.addEventListener('click', () => grandparentCalled = true);
    parent.addEventListener('click', () => parentCalled = true);
    child.addEventListener('click', () => childCalled = true);

    const clickEvent = new Event('click');
    child.dispatchEvent(clickEvent);

    t.true(childCalled);
    t.true(parentCalled);
    t.true(grandparentCalled);
});
```

## License

This project is licensed under the MIT License.
