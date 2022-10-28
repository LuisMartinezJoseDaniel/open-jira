import type { NextPage } from "next";

import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title={"Home - OpenJira"}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="Pendientes" />
            <CardContent>
              {/* Agregar una entrada */}
              <NewEntry />
              {/* Listado de las entradas */}
              <EntryList status={ "pending" } />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="En progreso" />

            {/* Agregar una entrada */}

            {/* Listado de las entradas */}
            <EntryList  status={ "in-progress" }/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="Completadas" />

            <CardContent>
              {/* Agregar una entrada */}

              {/* Listado de las entradas */}
              <EntryList  status={ "finished" }/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
