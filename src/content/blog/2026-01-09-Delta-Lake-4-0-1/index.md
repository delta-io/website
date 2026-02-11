---
title: Delta Lake 4.0.1 Release
description: We're excited to announce the release of Delta Lake 4.0.1. This release brings important bug fixes and improvements to Delta Lake 4.0, with a focus on Unity Catalog integration, authentication, and compatibility.
thumbnail: ./thumbnail.png
author:
  - robert-pack
  - timothy-wang
publishedAt: 2026-01-11
---

We're excited to announce the release of Delta Lake 4.0.1. This release brings important bug fixes and improvements to Delta Lake 4.0, with a focus on Unity Catalog integration, authentication, and compatibility.

Version 4.0.1 is a recommended update for all Delta Lake 4.0 users and includes:

- **Standardized catalog-managed table features**: clearer naming and better alignment with Unity Catalog conventions.
- **OAuth authentication for Unity Catalog**: secure, token-based authentication that works on JDK 8.
- **Unity Catalog integration foundation**: test infrastructure to validate UC behavior on the 4.0.x line.
- **Spark 4.0.1 compatibility fixes**: resolves binary compatibility issues that affected <span style="color:#d63384">REORG TABLE</span> operations.

This release is the result of contributions from the Delta Lake community. Thank you to everyone who reported issues, submitted pull requests, and helped test these improvements!

Let's take a closer look at what's new.

# Catalog-Managed Table Feature Standardization

🔥 **The catalog-managed table feature now has clearer, production-ready naming that aligns with Unity Catalog conventions.**

Delta Lake 4.0.1 standardizes the naming for catalog-managed tables. The table feature formerly called
<span style="color:#d63384">catalogOwned-preview</span> is now named <span style="color:#d63384">catalogManaged</span>
and the associated Unity Catalog table ID property has been updated to match (from
<span style="color:#d63384">ucTableId</span> to <span style="color:#d63384">catalogManaged.unityCatalog.tableId</span>).

This brings several benefits:

- **Clearer semantics**: The new name better reflects what the feature does: enabling the catalog to manage table storage and commits.
- **Commit validation**: the catalog now controls commit visibility and prevents invalid operations (e.g. commits that violate foreign key constraints) and enforces access controls.
- **Better Unity Catalog alignment**: Property names now follow Unity Catalog naming conventions, enhancing integration.
- **Production readiness**: The removal of <span style="color:#d63384">-preview</span> from the feature name signals stability and readiness for broader use.

> If you've already been exploring catalog-managed tables, you'll need to update your table properties to use the new naming
> conventions to continue using this experimental feature.

# OAuth Authentication for Unity Catalog

🔥 **You can now authenticate to Unity Catalog using OAuth, with automatic token acquisition and refresh.
No more static tokens required.**

Delta Lake 4.0.1 adds OAuth-based authentication for [Unity Catalog (0.3.1)](https://github.com/unitycatalog/unitycatalog/releases/tag/v0.3.1)
through a new catalog-scoped <span style="color:#d63384">auth.\*</span> configuration. This enables the use of dynamic,
short-lived tokens instead of long-lived, static credentials, thereby improving security and reducing operational
overhead.

The implementation includes a new internal TokenProvider that automatically acquires and refreshes OAuth tokens. Because Delta 4.0.1 must maintain JDK 8 compatibility, the OAuth provider has been ported directly into Delta rather than relying on the JDK 11-based unitycatalog-client library.

OAuth authentication gives you:

- **Automatic token management**: Delta handles token acquisition and refresh transparently.
- **Better security**: Short-lived tokens reduce credential exposure.
- **JDK 8 compatibility**: OAuth works on JDK 8 for the Delta Lake 4.0.x line.
- **Backward compatibility**: Legacy token configurations still work and are treated as static tokens.

## How to use OAuth with Unity Catalog

**Step 1**: Configure your UC catalog and endpoint

```shell
spark.sql.catalog.mycatalog = "io.unitycatalog.connectors.spark.UCSingleCatalog"
spark.sql.catalog.mycatalog.uri = "https://<your-workspace-host>"
```

**Step 2**: Choose an authentication mode:<br>
a. For static token mode (legacy-compatible)

```shell
# Preferred (new) format
spark.sql.catalog.mycatalog.auth.type  = "static"
spark.sql.catalog.mycatalog.auth.token = "<personal-access-token>"

# Legacy (still supported; auto-mapped to static)
spark.sql.catalog.mycatalog.token = "<personal-access-token>"
```

b. For OAuth (dynamic tokens via the ported provider on JDK 8)

```shell
spark.sql.catalog.mycatalog.auth.type        = "oauth"
spark.sql.catalog.mycatalog.auth.oauth.uri   = "https://<auth-server-endpoint>"
# Add any other provider-specific keys under auth.oauth.* required by your IdP/UC setup
# (e.g., client credentials, scopes, audience, token endpoint, etc.)
```

Delta constructs a TokenProvider from the auth.\* map and use it to obtain and refresh access tokens for UC operations.
No static tokens are embedded in your configs.

**Step 3**: Run with Delta’s Spark extensions as usual:

```bash
--conf "spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension"
--conf "spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog"
```

For an end-to-end example of the OAuth flow, including configuration and tests, see [PR #5742](https://github.com/delta-io/delta/pull/5742).

# Unity Catalog Integration Foundation

🔥 **Delta Lake 4.0.1 includes test infrastructure for validating Unity Catalog integration and DML behavior on the
4.0.x line.**

This update lays the foundation for Unity Catalog integration testing for all Delta Lake 4.0.x versions and introduces
a test-only module that wires Unity Catalog dependencies, aligns Jackson versions with Spark, and
adds UC DML tests to validate behavior without altering public APIs.

> This change has no user facing impact. It ensures Delta Lake's Unity Catalog integration remains stable and
> well-tested as the 4.0.x line evolves.

Key improvements include:

- **Test-only UC module**: A new <span style="color:#d63384">delta-spark-unitycatalog</span> module for UC integration tests, wired into the Spark aggregate and parameterized by the branch's Spark version.
- **Dependency alignment**: Jackson aligned to Spark's 2.15.4 and UC's transitive Jackson dependencies excluded to avoid version conflicts.
- **DML test scaffolding**: New UC DML test cases to exercise Unity Catalog execution paths on 4.0.x.
- **Build cleanups**: Fixes to build configuration and formatter settings.

For more details, refer to [PR #5735](https://github.com/delta-io/delta/pull/5735).

# Spark 4.0.1 Compatibility Fix

🔥 **REORG TABLE operations now work correctly with Spark 4.0.1, eliminating NoSuchMethodError failures.**

Delta Lake 4.0.0 had a binary compatibility issue with Spark 4.0.1 that caused
<span style="color:#d63384">REORG TABLE ... APPLY (PURGE)</span> commands to fail with a
<span style="color:#d63384">NoSuchMethodError</span>. This issue occurred because Spark 4.0.1 introduced a new parameter
to the ParquetToSparkSchemaConverter constructor, which broke code compiled against Spark 4.0.0.

Delta Lake 4.0.1 fixes this by:

- Replacing direct constructor calls with the stable SQLConf-based constructor to avoid binary incompatibility across Spark patch releases.
- Using <span style="color:#d63384">SparkSession.active.sessionState.conf</span> within executor <span style="color:#d63384">mapPartitions</span> to properly obtain SQL configuration settings.

This ensures Delta Lake works correctly across all Spark 4.0.x patch releases without requiring recompilation.

# Try Delta Lake 4.0.1 and Get Involved

Delta Lake 4.0.1 is available now. We recommend all Delta Lake 4.0 users update to this release for improved
compatibility, security, and Unity Catalog integration. Try the new features and share feedback in the
[Delta Users Slack](https://go.delta.io/slack) or [create issues on GitHub](https://github.com/delta-io/delta/issues).
