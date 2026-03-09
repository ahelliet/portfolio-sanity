import type {StructureResolver} from 'sanity/structure'
import {CogIcon, DocumentTextIcon, DatabaseIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // ─── Paramètres généraux ───
      S.listItem()
        .title('Paramètres généraux')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Paramètres généraux'),
        ),

      S.divider(),

      // ─── Pages ───
      S.listItem()
        .title('Pages')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Accueil')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Page d\'accueil'),
                ),
              S.listItem()
                .title('Blog')
                .child(
                  S.documentTypeList('post')
                    .title('Articles du blog'),
                ),
              S.listItem()
                .title('Projets')
                .child(
                  S.documentTypeList('project')
                    .title('Liste des projets'),
                ),
            ]),
        ),

      S.divider(),

      // ─── Collections ───
      S.listItem()
        .title('Collections')
        .icon(DatabaseIcon)
        .child(
          S.list()
            .title('Collections')
            .items([
              S.documentTypeListItem('post').title('Articles'),
              S.documentTypeListItem('project').title('Projets'),
              S.documentTypeListItem('author').title('Auteurs'),
              S.documentTypeListItem('testimonial').title('Témoignages'),
              S.documentTypeListItem('tool').title('Outils'),
            ]),
        ),
    ])
