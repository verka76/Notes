PGDMP                       }         	   notes_app    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16389 	   notes_app    DATABASE     }   CREATE DATABASE notes_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE notes_app;
                     postgres    false            �            1259    16474 	   note_tags    TABLE     ]   CREATE TABLE public.note_tags (
    note_id integer NOT NULL,
    tag_id integer NOT NULL
);
    DROP TABLE public.note_tags;
       public         heap r       postgres    false            �            1259    16456    notes    TABLE     �   CREATE TABLE public.notes (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "time" time without time zone
);
    DROP TABLE public.notes;
       public         heap r       postgres    false            �            1259    16455    notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notes_id_seq;
       public               postgres    false    218            �           0    0    notes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
          public               postgres    false    217            �            1259    16498 	   reminders    TABLE     �   CREATE TABLE public.reminders (
    id integer NOT NULL,
    description text,
    reminder_date timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reminders;
       public         heap r       postgres    false            �            1259    16497    reminders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reminders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.reminders_id_seq;
       public               postgres    false    223            �           0    0    reminders_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.reminders_id_seq OWNED BY public.reminders.id;
          public               postgres    false    222            �            1259    16466    tags    TABLE     `   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.tags;
       public         heap r       postgres    false            �            1259    16465    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public               postgres    false    220            �           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public               postgres    false    219            /           2604    16459    notes id    DEFAULT     d   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            2           2604    16501    reminders id    DEFAULT     l   ALTER TABLE ONLY public.reminders ALTER COLUMN id SET DEFAULT nextval('public.reminders_id_seq'::regclass);
 ;   ALTER TABLE public.reminders ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    223    223            1           2604    16469    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �          0    16474 	   note_tags 
   TABLE DATA           4   COPY public.note_tags (note_id, tag_id) FROM stdin;
    public               postgres    false    221   ;!       �          0    16456    notes 
   TABLE DATA           M   COPY public.notes (id, title, content, date, created_at, "time") FROM stdin;
    public               postgres    false    218   h!       �          0    16498 	   reminders 
   TABLE DATA           O   COPY public.reminders (id, description, reminder_date, created_at) FROM stdin;
    public               postgres    false    223   �"       �          0    16466    tags 
   TABLE DATA           (   COPY public.tags (id, name) FROM stdin;
    public               postgres    false    220   �#       �           0    0    notes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.notes_id_seq', 10, true);
          public               postgres    false    217            �           0    0    reminders_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.reminders_id_seq', 3, true);
          public               postgres    false    222            �           0    0    tags_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tags_id_seq', 9, true);
          public               postgres    false    219            ;           2606    16478    note_tags note_tags_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.note_tags
    ADD CONSTRAINT note_tags_pkey PRIMARY KEY (note_id, tag_id);
 B   ALTER TABLE ONLY public.note_tags DROP CONSTRAINT note_tags_pkey;
       public                 postgres    false    221    221            5           2606    16464    notes notes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
       public                 postgres    false    218            =           2606    16506    reminders reminders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.reminders
    ADD CONSTRAINT reminders_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.reminders DROP CONSTRAINT reminders_pkey;
       public                 postgres    false    223            7           2606    16473    tags tags_name_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);
 <   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_name_key;
       public                 postgres    false    220            9           2606    16471    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public                 postgres    false    220            >           2606    16479     note_tags note_tags_note_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.note_tags
    ADD CONSTRAINT note_tags_note_id_fkey FOREIGN KEY (note_id) REFERENCES public.notes(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.note_tags DROP CONSTRAINT note_tags_note_id_fkey;
       public               postgres    false    4661    218    221            ?           2606    16484    note_tags note_tags_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.note_tags
    ADD CONSTRAINT note_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.note_tags DROP CONSTRAINT note_tags_tag_id_fkey;
       public               postgres    false    220    221    4665            �      x�3�4�2�4�2�4�2�4����� ��      �   F  x���KN�0���)|�F����g�0} �ԊJl`��B�6m���
�߈�� �²����N#�����P)��4�#�S��í�d!k���Ǚ�'�>��w�!�Bø�2
�(d&Id��G:i�/��Ze�.5.':���]�3g'��8�����УE*�a����?��G�B�Jn�����Ď0(�v{�{���N�������eSg��F�`����;z��b_�SmQq�6�<Gx�Q��H�yɘ6Dt���#�`�aϲ���f0��G�]�;�c�5�*�X��%�L�zPy�m>�:��~���؇�T'?<��(��i|��q��rYM      �   �   x���A�0E��sH[
$���H5q!�{��+���S%lMf�;��7n�s����sMXx���a��^��^�wd��bm�T�ѥ�y֑5e��.O\�lZ(+��+��9�1r-�g����б_�l�32�B�*����٢��(`Ht( �`>R�_6�V���K�R_���      �   �   x�-���@�v� �?�B1( !!nA	$a���¸#���%����+��J����6t$jO�?N�����M�c��L������:�a�I��:�j�n[^_+]�W�����vE�ҸVg�����Ӷe�     