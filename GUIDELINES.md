# App

- In the app folder, pages should be only skeleton / layout of application.

- All pages should import modules from packages/modules to build an application

- Next Application never knows the implementation of requests, only the core package

## Packages

- packages/modules can import NextJS imports, core and ui.

- packasges/ui must exist agnostic of NextJS, but only React, and UI Library

- packages/core should be agnostic with request, types and states, except of hooks of Tanstack Query.
