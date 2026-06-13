# AgroFlow | The Logistics Protocol
### Eliminating Post-Harvest Loss through Triangular Trade & Autonomous AI Orchestration

[![Java Version](https://img.shields.io/badge/Java-21-orange.svg)](https://jdk.java.net/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Database](https://img.shields.io/badge/PostgreSQL-17-blue.svg)](https://www.postgresql.org/)
[![Architecture](https://img.shields.io/badge/Architecture-AI--Augmented%20Micro--Monolith-blueviolet.svg)]()

---

## 1. Executive Summary

### The Problem
Nigerian agricultural supply chains suffer from severe fragmentation. Smallholder farmers lose up to 40% of perishable yields (such as tomatoes and peppers) due to the absence of immediate, predictable transport linkages and structured access to off-take markets.

### The Solution
AgroFlow is an enterprise-grade logistics protocol and marketplace engine designed to synchronize **Supply** (Farmers), **Demand** (Marketers), and **Logistics** (Transporters) in real-time. By leveraging a high-performance Java infrastructure and upcoming autonomous AI agents, AgroFlow creates a highly reliable transactional pipeline that secures produce routing before spoilage occurs.

### Revenue Model
The platform operates on a transaction-based fee clearing model applied to every successfully fulfilled delivery contract, paired with premium placement metrics ("Rush Listings") for highly time-sensitive, perishable payloads.

---

## 2. System Architecture & Project Layout

The system is organized as a unified workspace hosting decoupled multi-tier components, bridging modular enterprise backend services with responsive frontend client applications.

```text
AgroFlow/
│
├── agroflow-backend/     # Enterprise Java 21 & Spring Boot 3.x REST API Engine
├── frontend/             # Client User Interface (React / Next.js)
└── docker-compose.yml    # Containerized Local Infrastructure Orchestration
```

### Core Infrastructure Foundations
* **Runtime Environment:** Java 21 LTS / Spring Boot 3.x.
* **Database Engine:** PostgreSQL 17 for high-performance relational storage and complex query execution.
* **Database Migrations:** Managed dynamically via the Flyway Evolution Engine. Migration scripts are maintained within version control under `src/main/resources/db/migration`.
* **Security & Environment Boundaries:** Zero hardcoded configuration secrets. Production-ready configurations utilize externalized environment variables injected into the runtime context, preserving credential isolation across local and shared team spaces.

---

##  3. High-Availability & Resilient Edge Case Logic

To survive real-world deployment challenges in emerging markets, the platform implements architectural mitigations for common logistics failure states:

| Production Vector | Real-World Risk | Protocol Mitigation |
| :--- | :--- | :--- |
| **Partial Contract Fulfillment** | A Marketer accepts only a partial subset of a large available harvest volume. | **The Splitter Pattern:** Core ledger state machinery automatically splits the transaction, spinning off a new, linked market listing for the remaining balance. |
| **Transporter Default / No-Show** | A registered logistics provider claims a job but fails to arrive within the critical harvest window. | **Heartbeat State Eviction:** A background cron service continuously monitors active pickups. Unfulfilled jobs automatically evict and return to the `AVAILABLE` pool after a strict 4-hour timeout. |
| **Cargo Interception / Transit Theft** | High-value produce is redirected or stolen during transit. | **OTP Cryptographic Escrow:** Funds are securely held in an escrow state and released to the transporter's ledger *only* when the receiving Marketer inputs a unique, system-generated verification token at delivery. |
| **Geographic Ingestion Variant** | Regional differences in data entry casing cause missing matches (e.g., "Lagos" vs "lagos"). | **Canonical Data Normalization:** Persistence logic strictly sanitizes and maps all structural geographical references to normalized lowercase strings before executing queries. |

---

##  4. Core Product Engineering Principles

1. **Environment-First Constraints:** Interfaces and transmission protocols are engineered around local real-world boundaries—specifically optimizing for high-glare market viewports, low-tier Android hardware, and high-latency 3G wireless infrastructure.
2. **Deterministic Transactional Integrity:** Trust is managed mathematically. No status transitions, ledger alterations, or logistics assignments occur without programmatic validation and secure digital verification tokens.
3. **Strict Data Sanitization:** All fiscal fields map to high-precision numeric formats to avoid rounding drifts, while transactional histories employ explicit, unified timezone timestamps.

---

##  5. Getting Started (Local Engineering Setup)

Follow these steps to initialize the local containerized infrastructure and compile the core engine.

### System Prerequisites
* **Java Development Kit (JDK):** Version 21 LTS or higher
* **Container Engine:** Docker Desktop / Docker Daemon
* **Build Tooling:** Apache Maven 3.x (or wrapped execution scripts)

### 1. Initialize Containerized Infrastructure
Spin up the detached PostgreSQL 17 database node from the project root directory:
```bash
docker-compose up -d
```

### 2. Configure Environment Context
Inject the required local credentials into your IDE or terminal shell environment to authorize the application data-source connection:
* `AGROFLOW_DB_USER`
* `AGROFLOW_DB_PASSWORD`

### 3. Compile and Boot the Application Engine
Navigate to the backend module directory, resolve dependencies, and launch the Spring Boot runtime:
```bash
cd agroflow-backend
./mvnw spring-boot:run
```
The REST engine will initialize, automatically execute pending Flyway migration baselines, and expose its endpoints for incoming client consumption on port `8080`.
